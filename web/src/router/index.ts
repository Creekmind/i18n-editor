import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectList from '@/components/project-list.vue';
import ProjectForm from '@/components/project-form.vue';
import ProjectSetupForm from '@/components/project-setup-form.vue';

const routes: Array<RouteRecordRaw> = [{
  path     : '/',
  component: Home,
  redirect : 'projects',
  children : [{
    path     : 'projects',
    name     : 'projects',
    component: ProjectList
  }, {
    path     : 'projects/:id',
    component: ProjectForm,
    props    : true
  }, {
    path     : 'projects/:id/setup',
    component: ProjectSetupForm,
    props    : true
  }, {
    path     : 'projects/new/setup',
    component: ProjectSetupForm
  }]
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
