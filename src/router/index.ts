import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView2.vue';
//import UserDetailsView from '../views/UserDetailsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

