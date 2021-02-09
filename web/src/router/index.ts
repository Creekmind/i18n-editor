import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectForm from '@/components/ProjectForm.vue';

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
  }]
}, {
  path     : '/about',
  name     : 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "about" */ '../views/About.vue')
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
