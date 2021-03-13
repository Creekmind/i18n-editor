<template>
  <div class="status-bar px-12 py-4">
    <span v-if="!$store.state.project.translationsSaving" class="cm-flex cm-ai-center">
      <svg class="saved-state mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
      </svg>
      Saved
    </span>

    <span v-if="$store.state.project.translationsSaving" class="cm-flex cm-ai-center">
      Saving...
    </span>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'i18n-status-bar'
})
export default class ProjectStatusBar extends Vue {
}
</script>

<style scoped lang="scss">
@import "src/scss/components/variables";

.status-bar {
  border-top: 1px solid $secondaryDark;
  line-height: 20px;

  .saved-state {
    width: 14px;
    height: 14px;
  }
}
</style>
