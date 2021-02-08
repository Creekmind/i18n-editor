<template>
  <div class="cm-card">
    <div class="cm-card-header px-12">Projects</div>

    <div class="cm-card-content">
      <div class="project p-12" v-for="project in projects" v-bind:key="project.id">
        <div>{{ project.name }}</div>
        <div class="cm-text small">Last updated at: {{ project.updateDate }}</div>
      </div>
    </div>

    <div class="cm-card-footer px-12">
      <button class="cm-button" @click="onNewProjectClick">
        New project
      </button>
    </div>
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

  onRowClick(project: Project) {
    this.$router.push({ path: `/projects/${project.id}` });
  }

  onNewProjectClick() {
    this.$router.push('/projects/new');
  }

  private refresh() {
    this.api.find().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
</script>

<style scoped lang="scss">

  @import "src/scss/components/variables";

  .project {
    cursor: pointer;

    &:hover {
      background-color: #f4f4f4;
    }

    &:active {
      background-color: $primaryText;
    }

    .project-date {
    }
  }

</style>
