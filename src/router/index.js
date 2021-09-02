import Vue from 'vue'
import Router from 'vue-router'
import MainPage from "../pages/MainPage.vue";
import Page from "../pages/Page.vue";

Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: "MainPage",
        path: '/',
        component: MainPage
      },
      {
        name: "Page",
        path: '/:href',
        component: Page
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
};
