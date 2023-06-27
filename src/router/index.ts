import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import UserListView from '../views/UserListView.vue';
//import UserDetailsView from '../views/UserDetailsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'UserList',
    component: UserListView
  }
  // {
  //   path: '/user/:id',
  //   name: 'UserDetail',
  //   component: UserDetailsView
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

