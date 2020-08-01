import Vue from 'vue'
import VueRouter from 'vue-router'

import Server from '@/views/Server'
import Landing from '@/views/Landing'
import Welcome from '@/views/Welcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },

  {
    path: '/server',
    name: 'Server',
    component: Server,

    meta: { server: true }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,

    meta: { welcome: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
