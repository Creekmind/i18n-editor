<template>
  <div class="project cm-flex cm-flex-column">
    <h3 class="ml-12 mt-12">Project "{{ project.toString() }}"</h3>
    <div class="cm-flex cm-flex-1">
      <div class="keys cm-flex-0 px-12">
        <input class="cm-input cm-fluid" placeholder="Search...">

        <i18n-tree class="mt-12"></i18n-tree>
      </div>

      <div class="divider"></div>

      <div class="values cm-flex-1">

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Project } from '@/classes/project';
import { api } from '@/api/api';
import Tree from '@/components/tree/Tree.vue';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: String
  },
  watch     : {
    id: 'getProject'
  },
  components: {
    'i18n-tree': Tree
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
@import "src/scss/components/variables";

.project {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.keys {
  flex-basis: 300px;
}

.divider {
  width: 1px;
  background: $secondaryDark;
}
</style>
