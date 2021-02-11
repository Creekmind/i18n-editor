<template>
  <div class="cm-card p-12">
    <div class="cm-card-header cm-text ellipsis" v-if="project">
      Project "{{ project.name }}"
    </div>
    <div class="cm-card-content">
      <form class="cm-form">
        <div class="cm-field">
          <label>
            Name
            <input class="cm-input" v-model="project.name">
          </label>
        </div>

        <div class="cm-field">
          <label>
            Languages
            <div class="cm-flex">
              <input class="cm-input cm-flex-1 mr-4" ref="language-input" placeholder="Type name of language"
                     @keypress.enter="onAddLanguageClick">
              <button type="button" class="cm-button" @click="onAddLanguageClick">Add language</button>
            </div>
          </label>
        </div>

        <div v-for="(language, index) in project.languages" :key="index" class="cm-tag mr-4 mb-12">
          <svg class="trigger cm-tag-icon" :class="{ primary: language.isPrimary }" @click="onStarClick(language)"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
          {{ language.iso }}

          <svg class="delete-language" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg" @click="onDeleteLanguageClick(language)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <div class="cm-flex">
          <button type="button" class="cm-button icon outline" @click="$router.push('/projects')">
            <svg class="cm-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>

            Back to projects
          </button>
          <div class="cm-flex-1"></div>
          <button type="button" class="cm-button mr-8" @click="onSave">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
import { Language } from '@/classes/language';
import { api } from '@/api/api';

@Options({
  name : 'i18n-project-form',
  props: {
    id: String
  },
  watch: {
    id: 'getProject'
  }
})
export default class ProjectForm extends Vue {
  id!: string;
  name!: string;
  project = new Project();

  mounted() {
    this.getProject(this.id);
  }

  getProject(id: string) {
    api.projects.findOne(id).subscribe(project => {
      this.project = project;
    });
  }

  onAddLanguageClick() {
    const languageInput = this.$refs['language-input'] as HTMLInputElement;
    const language = new Language(languageInput.value, false);
    this.project.languages.push(language);

    languageInput.value = '';
  }

  onDeleteLanguageClick(language: Language) {
    const index = this.project.languages.indexOf(language);
    if (index >= 0) {
      this.project.languages.splice(index, 1);
    }
  }

  onSave() {
    api.projects.save(this.project).subscribe((project) => {
      this.project = project;
    });
  }

  onDelete() {
    api.projects.delete(this.project).subscribe(() => {
      // TODO redirect to list
    });
  }

  onStarClick(language: Language) {
    this.project.languages.forEach(l => {
      l.isPrimary = false;
    });
    language.isPrimary = true;
  }
}
</script>

<style scoped lang="scss">
.cm-card {
  width: 600px;
}

.trigger {
  margin-right: 8px;
  cursor: pointer;
  fill: none;
  stroke: black;

  &.primary {
    fill: #ffb42b;
    cursor: default;
  }
}

.delete-language {
  width: 16px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
