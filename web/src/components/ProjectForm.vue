<template>
  <form v-if="project">
    <div>
      <label>ID</label>
      <input readonly v-model="project.id">
    </div>

    <div>
      <label>Name</label>
      <input v-model="project.name">
    </div>

    <div>
      <label>Languages</label>
      <div v-for="(language, index) in project.languages" :key="index">
        <input v-model="language.iso">
      </div>
    </div>

    <div>
      <button type="button" @click="onAddLanguageClick">Add language</button>
    </div>
  </form>

  <div>
    <button>Save</button>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { ProjectApiService } from '@/api/project';
import { Project } from '@/classes/project';
import { Language } from '@/classes/language';

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

  private api = ProjectApiService.new();

  mounted() {
    this.getProject(this.id);
  }

  getProject(id: string) {
    this.api.find().subscribe(projects => {
      this.project = projects.find(p => p.id === id) ?? new Project()
      console.log('opened project', this.project, this.project.languages);
    });
  }

  onAddLanguageClick() {
    this.project.languages.push(new Language(''));
  }
}
</script>

<style scoped lang="scss">

</style>
