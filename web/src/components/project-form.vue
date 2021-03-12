<template>
  <div class="project cm-flex cm-flex-column">
    <h3 class="ml-12 mt-12">Project "{{ project.toString() }}"</h3>
    <div class="cm-flex cm-flex-1">
      <div class="keys cm-flex-0 px-12 cm-flex cm-flex-column">
        <input class="cm-input cm-fluid" placeholder="Search...">

        <i18n-tree :root="root" class="my-12 cm-flex-1" @nodeClick="onNodeClick" />

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

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: {
      type    : String,
      required: true
    }
  },
  watch     : {
    id                : 'fetchProject',
    '$route.query.key': 'activateTranslations'
  },
  components: {
    'i18n-tree': Tree
  }
})
export default class ProjectForm extends Vue {
  id = '';
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

  private refreshTree(id: string) {
    api.translations.findKeys(id).subscribe((translations: Translations[]) => {
      this.keys = translations;
      this.root = keyTranslationsToTree(translations);
    });
  }

  private saveTranslation(key: string, translations: Translation[], activeTranslations: Translations) {
    api.translations.save(new Translations(key, this.project.id, translations)).subscribe({
      next: () => {
        activeTranslations.translations = translations;
      },
      error: (response: AxiosResponse) => {
        console.error(response.data);
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

  .keys {
    flex-basis: 400px;
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
