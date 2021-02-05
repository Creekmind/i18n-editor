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
    <button @click="onSave">Save</button>
  </div>
  <div>
    <button @click="onDelete">Delete</button>
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
    this.api.findOne(id).subscribe(project => {
      this.project = project;
    });
  }

  onAddLanguageClick() {
    this.project.languages.push(new Language(''));
  }

  onSave() {
    this.api.save(this.project).subscribe((project) => {
      this.project = project;
    });
  }

  onDelete() {
    this.api.delete(this.project).subscribe(() => {
      // TODO redirect to list
    });
  }
}
</script>

<style scoped lang="scss">

</style>
