<template>
  <div class="cm-card">
    <div class="cm-card-header px-12">Projects</div>

    <div class="cm-card-content">
      <div class="project p-12 cm-flex cm-ai-center" v-for="project in projects" :key="project.id" @click="onRowClick(project)">
        <div class="cm-flex-1 project-name">
          <div class="cm-text ellipsis">{{ project.name }}</div>
          <div class="cm-text very small">Last updated at: {{ formatDate(project.updateDate) }}</div>
        </div>

        <div class="edit-project mr-8" title="Setup projects" @click.stop="onProjectEditClick(project)">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </div>

        <div class="delete-project" title="Delete project" @click.stop="onProjectDeleteClick(project)">
          <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="cm-card-footer px-12">
      <button type="button" class="cm-button" @click="onNewProjectClick">
        New project
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
import ProjectForm from '@/components/project-setup-form.vue';
import moment from 'moment';
import { api } from '@/api/api';

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

  mounted() {
    this.refresh();
  }

  onRowClick(project: Project) {
    this.$router.push({ path: `/projects/${project.id}` });
  }

  onProjectEditClick(project: Project) {
    this.$router.push({ path: `/projects/${project.id}/setup` });
  }

  onProjectDeleteClick(project: Project) {
    api.projects.delete(project).subscribe(() => {
      this.refresh();
    });
  }

  onNewProjectClick() {
    this.$router.push('/projects/new');
  }

  formatDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY HH:mm');
  }

  private refresh() {
    api.projects.find().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
</script>

<style scoped lang="scss">

  @import "src/scss/components/variables";

  .project {
    cursor: pointer;
    width: 270px;

    &:hover {
      background-color: #f4f4f4;

      .delete-project, .edit-project {
        display: inline-block;
      }
    }

    &:active {
      background-color: $primaryText;
    }

    .project-date {

    }

    .project-name {
      overflow: hidden;
    }

    .edit-project, .delete-project {
      display: none;

      & > svg {
        width: 16px;
        height: 16px;
      }
    }

  }

</style>
