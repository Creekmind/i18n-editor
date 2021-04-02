<template>
  <div class="project cm-flex cm-flex-column">
    <h3 class="px-12 my-12">
      Project "{{ project.toString() }}"
    </h3>
    <div class="cm-flex cm-flex-1 project-workspace">
      <div class="keys cm-flex-0 px-12 mt-12 cm-flex cm-flex-column">
        <div class="action-bar cm-flex cm-ai-center mb-4">
          <div title="Export JSON" class="export-json" @click="exportJSON">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div title="Import JSON" class="import-json" @click="$ref">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd"></path>
            </svg>

            <input ref="uploadInput" type="file">
          </div>
        </div>

        <input class="cm-input cm-fluid" placeholder="Search..." v-model="searchQuery">

        <i18n-tree :root="root" class="my-12 cm-flex-1 keys__tree" @nodeClick="onNodeClick">
          <template v-slot:default="slotProps">
            <div class="cm-flex cm-ai-center">
              <div class="cm-flex-1">
                {{ slotProps.node?.name }}
              </div>
              <template v-if="!slotProps.node?.children.length  && hasWarnings(slotProps.data)">
                <svg class="mr-4 warning" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </template>
            </div>
          </template>
        </i18n-tree>

        <div class="cm-flex cm-fluid mb-12">
          <input ref="newKeyInput" class="cm-input cm-flex-1 mr-4" placeholder="Type new key">
          <button class="cm-button" @click="onNewKeyAdd()">Add key</button>
        </div>
      </div>

      <div class="divider"></div>

      <div class="translations cm-flex-1 mx-24">
        <div class="my-10">
          {{ $route.query.key }}
        </div>
        <div class="translation mb-8" v-for="translation in activeKeyTranslations.translations" :key="translation.language">
          <div>{{ translation.language }}</div>
          <textarea rows="5" class="cm-input" v-model="translation.value"
                    @keyup="onTranslationChange(activeKey, activeKeyTranslations.translations)"></textarea>
        </div>
      </div>
    </div>
    <i18n-project-status-bar></i18n-project-status-bar>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
import { api } from '@/api/api';
import Tree from '@/components/tree/tree.vue';
import { Node } from '@/components/tree/classes/node';
import { Translation } from '@/classes/translation';
import { Translations } from '@/classes/translations';
import { keyTranslationsToTree } from '@/components/helpers/tree';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import ProjectStatusBar from '@/components/project-status-bar.vue';
import { keyTranslationsToJSON } from '@/components/helpers/keys';
import JSZip from 'jszip';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: {
      type    : String,
      required: true
    }
  },
  watch: {
    id                : 'fetchProject',
    '$route.query.key': 'activateTranslations',
    searchQuery       : 'search'
  },
  components: {
    'i18n-tree': Tree,
    'i18n-project-status-bar': ProjectStatusBar
  }
})
export default class ProjectForm extends Vue {
  id = '';
  searchQuery = '';
  project = new Project();
  root: Node | null = null;
  keys: Translations[] = [];
  activeKey = '';
  activeKeyTranslations: Translations = new Translations('', '');
  translationsChange$ = new Subject<{ key: string; translations: Translation[]; activeTranslations: Translations }>();

  mounted() {
    this.fetchProject(this.id).subscribe(() => {
      this.activateTranslations(this.$route.query.key as string);
    });

    this.translationsChange$.pipe(
      debounceTime(1000)
    ).subscribe(({ key, translations, activeTranslations }: { key: string; translations: Translation[]; activeTranslations: Translations }) => {
      this.saveTranslation(key, translations, activeTranslations);
    });
  }

  fetchProject(id: string) {
    this.refreshTree(id);

    return api.projects.findOne(id).pipe(tap((project: Project) => {
      this.project = project;
    }));
  }

  search(query: string) {
    let translations = this.keys;
    if (query !== '') {
      translations = translations.filter(t => t.id.toLowerCase().indexOf(query.toLocaleLowerCase()) >= 0)
    }
    this.root = keyTranslationsToTree(translations);
    this.root?.activate(this.$route.query.key as string);
  }

  onNodeClick(node: Node) {
    this.$router.push({
      query: {
        key: node.id
      }
    });
  }

  onNewKeyAdd() {
    const inputEl = this.$refs.newKeyInput as HTMLInputElement;
    const key = inputEl.value;
    api.translations.create(new Translations(key, this.project.id)).subscribe(() => {
      this.refreshTree(this.id);
      this.activateTranslations(key);
    });
  }

  onTranslationChange(key: string, translations: Translation[]) {
    this.$store.dispatch('startTranslationsSaving');
    this.translationsChange$.next({
      key         : key,
      translations: translations,
      activeTranslations: this.activeKeyTranslations // Pass current active key, because it can be changed while debouncing
    });
  }

  activateTranslations(key: string) {
    const keyTranslations = this.keys.find(t => t.id === key) || new Translations(key, this.project.id);
    this.activeKey = key;
    this.activeKeyTranslations = keyTranslations;

    this.project.languages.forEach(language => {
      const translation = this.activeKeyTranslations.translations.find(t => t.language === language.iso);
      if (!translation) {
        this.activeKeyTranslations.translations.push(new Translation(language.iso));
      }
    });

    this.root?.activate(key);
  }

  hasWarnings(key: Translations) {
    if (!key) {
      return false;
    }

    if (key.translations.length < this.project.languages.length) {
      return true;
    }
    for (const translation of key.translations) {
      if (!translation.value) {
        return true;
      }
    }
    return false;
  }

  exportJSON() {
    const zip = new JSZip();

    this.project.languages.forEach((language) => {
      const json = keyTranslationsToJSON(this.keys, language.iso);
      const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
      zip.file(`${language.iso}.json`, blob);
    });

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const uri = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${this.project.name}.zip`;
      link.href = uri;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, function(err) {
      console.error(err);
    });
  }

  private refreshTree(id: string) {
    api.translations.findKeys(id).subscribe((translations: Translations[]) => {
      this.keys = translations;
      this.search(this.searchQuery);
    });
  }

  private saveTranslation(key: string, translations: Translation[], activeTranslations: Translations) {
    api.translations.save(new Translations(key, this.project.id, translations)).subscribe({
      next: () => {
        activeTranslations.translations = translations;
        this.$store.dispatch('stopTranslationsSaving');
      },
      error: (response: AxiosResponse) => {
        console.error(response.data);
        this.$store.dispatch('stopTranslationsSaving');
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/components/variables";

.project {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .project-workspace {
    border-top: 1px solid $secondaryDark;
    overflow: hidden;

    .warning {
      width: 12px;
      height: 12px;
      color: $yellow;
    }

    .action-bar {
      .export-json, .import-json {
        width: 24px;
        height: 24px;
        color: $primaryDark;
        cursor: pointer;
      }
    }
  }

  .keys {
    flex-basis: 400px;

    &__tree {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .translations {
    .translation {
      textarea {
        width: 100%;
        resize: none;
      }
    }
  }
}

.divider {
  width: 1px;
  background: $secondaryDark;
}
</style>
