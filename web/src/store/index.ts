import { createStore } from 'vuex';
import { projectStore } from '@/store/project';

export const store = createStore({
  modules: {
    project: projectStore
  }
});
