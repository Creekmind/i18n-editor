<template>
  Projects:
  <div v-for="project in projects" :key="project.id">
    {{ project }}
  </div>
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";
import { Project } from '@/classes/project';
import { ProjectApiService } from '@/api/project';

@Options({
  name : 'i18n-project-list',
  props: {
    msg: String
  }
})
export default class ProjectList extends Vue {
  projects: Project[] = [];

  mounted() {
    this.refresh();
  }

  private refresh() {
    const api = ProjectApiService.new();
    api.find().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
</script>

<style scoped lang="scss">

</style>
