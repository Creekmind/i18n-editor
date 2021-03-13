import { ActionContext } from 'vuex';

interface ProjectState {
  translationsSaving: boolean;
}

export const projectStore = {
  strict   : true,
  state    : () => {
    return {
      translationsSaving: false
    };
  },
  mutations: {
    startTranslationsSaving(state: ProjectState) {
      state.translationsSaving = true;
    },
    stopTranslationsSaving(state: ProjectState) {
      state.translationsSaving = false;
    }
  },
  actions: {
    startTranslationsSaving(ctx: ActionContext<ProjectState, unknown>) {
      ctx.commit('startTranslationsSaving');
    },
    stopTranslationsSaving(ctx: ActionContext<ProjectState, unknown>) {
      setTimeout(() => {
        ctx.commit('stopTranslationsSaving');
      }, 200);
    }
  }

};
