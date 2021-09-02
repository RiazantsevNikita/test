import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/countries',
    name: 'Countries',
    component: () => import('../views/Countries/All.vue')
  },
  {
    path: '/companies',
    name: 'Companies',
    component: () => import('../views/Companies/All.vue')
  },
  {
    path: '/catalogs',
    name: 'Catalogs',
    component: () => import('../views/Catalogs/All.vue')
  },
  {
    path: '/add-catalog',
    name: 'AddCatalog',
    component: () => import('../views/Catalogs/Add.vue')
  },
  {
    path: '/update-catalog/:id',
    name: 'UpdateCatalog',
    component: () => import('../views/Catalogs/Update.vue')
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('../views/Page/All.vue')
  },
  {
    path: '/add-page',
    name: 'AddPage',
    component: () => import('../views/Page/Add.vue')
  },
  {
    path: '/update-page/:id',
    name: 'UpdatePage',
    component: () => import('../views/Page/Update.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu/All.vue')
  },
  {
    path: '/add-menu',
    name: 'AddMenu',
    component: () => import('../views/Menu/Add.vue')
  },
  {
    path: '/update-menu/:id',
    name: 'UpdateMenu',
    component: () => import('../views/Menu/Update.vue')
  },
  {
    path: '/update-slider',
    name: 'UpdateSlider',
    component: () => import('../views/Slider/Slider.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
