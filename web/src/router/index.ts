import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectForm from '@/components/ProjectForm.vue';
import ProjectSetupForm from '@/components/ProjectSetupForm.vue';

const routes: Array<RouteRecordRaw> = [{
  path     : '/',
  name     : 'Home',
  component: Home,
  children : [{
    path     : 'projects',
    name     : 'Projects',
    component: ProjectList
  }, {
    path     : 'projects/:id',
    component: ProjectForm,
    props    : true
  }, {
    path     : 'projects/:id/setup',
    component: ProjectSetupForm,
    props    : true
  }]
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
