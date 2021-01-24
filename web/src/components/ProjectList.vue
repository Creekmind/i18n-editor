<template>
  Projects:
  <div v-for="project in projects" :key="project.id">
    {{ project }}
  </div>

  <button @click="create">New project</button>
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
  api = ProjectApiService.new();

  mounted() {
    this.refresh();
  }

  create() {
    this.api.create(new Project('', 'Testing')).subscribe(() => {
      this.refresh();
    });
  }

  private refresh() {
    this.api.find().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
</script>

<style scoped lang="scss">

</style>
