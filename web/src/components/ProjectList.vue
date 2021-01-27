<template>
  <h3>Projects</h3>
  <div v-for="project in projects" :key="project.id">
    <router-link :to="`/projects/${project.id}`">
      {{ project.id }}
    </router-link>
  </div>

  <div>
    <router-link to="/projects/new">New project</router-link>
  </div>
  <div></div>

  <div>
    -------------------------------------------------------------------
  </div>

  <div>
    <h3>Project</h3>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
import { ProjectApiService } from '@/api/project';
import ProjectForm from '@/components/ProjectForm.vue';

@Options({
  name      : 'i18n-project-list',
  props     : {
    msg: String
  },
  components: {
    'i18n-project-form': ProjectForm
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
