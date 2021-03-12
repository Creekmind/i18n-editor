<template>
  <div class="project cm-flex cm-flex-column">
    <h3 class="ml-12 mt-12">Project "{{ project.toString() }}"</h3>
    <div class="cm-flex cm-flex-1">
      <div class="keys cm-flex-0 px-12">
        <input class="cm-input cm-fluid" placeholder="Search...">

        <i18n-tree :root="root" class="mt-12" @nodeClick="onNodeClick"/>

        <div class="cm-flex cm-fluid">
          <input ref="newKeyInput" class="cm-input cm-flex-1 mr-4" placeholder="Type new key">
          <button class="cm-button" @click="onNewKeyAdd()">Add key</button>
        </div>
      </div>

      <div class="divider"></div>

      <div class="translations cm-flex-1 mx-24">
        <div class="translation mb-8" v-for="translation in activeTranslations" :key="translation.language">
          <div>{{ translation.language }}</div>
          <textarea rows="5" class="cm-input" ></textarea>
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

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: {
      type: String,
      required: true
    }
  },
  watch     : {
    id: 'fetchProject',
    '$route.query.key': 'activateTranslations'
  },
  components: {
    'i18n-tree': Tree
  }
})
export default class ProjectForm extends Vue {
  id!: string;
  project = new Project();
  root: Node | null = null;
  activeTranslations: Translation[] = [];

  mounted() {
    this.fetchProject(this.id);
  }

  fetchProject(id: string) {
    api.translations.findKeys(id).subscribe((translations: Translations[]) => {
      this.root = keyTranslationsToTree(translations)
    });

    api.projects.findOne(id).subscribe((project: Project) => {
      this.project = project;
    });
  }

  onNodeClick(node: Node) {
    this.$router.push({
      query: {
        key: node.name
      }
    });
  }

  onNewKeyAdd() {
    const inputEl = this.$refs.newKeyInput as HTMLInputElement;
    api.translations.create(new Translations(inputEl.value, this.project.id)).subscribe((translations: Translations) => {
      console.log(translations);
    });
  }

  activateTranslations(key: string) {
    const activeTranslations: Translation[] = [];
    const translations = this.project.translations[key] || [];
    this.project.languages.forEach(language => {
      const translation = translations.find(t => t.language === language.iso) || new Translation(language.iso);
      activeTranslations.push(translation);
    });
    this.activeTranslations = activeTranslations;
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
