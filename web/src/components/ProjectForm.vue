<template>
  <div>
    <h3>Project "{{ project.toString() }}"</h3>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
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
  project = new Project();

  mounted() {
    this.getProject(this.id);
  }

  getProject(id: string) {
    api.projects.findOne(id).subscribe((project: Project) => {
      this.project = project;
    });
  }
}
</script>

<style scoped lang="scss">

</style>
