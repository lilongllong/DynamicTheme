import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { message } from 'ant-design-vue';
import store from '@/store';

import PageLayout from '@/layouts/PageLayout.vue';
/** 问答 */

import Index from '@/views/index/index.vue';


Vue.use(VueRouter);

export const createRouter = (props?: any) => {
  const baseRoutes: RouteConfig[] = [
    {
      path: '/',
      name: 'home',
      component: PageLayout,
      children: [
        {
          path: '',
          name: 'index',
          meta: {
            title: '首页',
            requiresAuth: true,
            hideSidebar: true,
          },
          component: Index,
        },
    ],
  }];

  const routes = [...baseRoutes];

  const router = new VueRouter({
    /* mode: 'history',
      base: process.env.BASE_URL, */
    routes,
  });

  return router;
};

export default createRouter();

