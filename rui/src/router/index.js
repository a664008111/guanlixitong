import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/home"
import He_home from "@/components/he_home"
import Personal from "@/components/personal"
import He_show from "@/components/he_show"
import Setup from "@/components/Setup"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/helloWorld/',
          name: 'He_show',
          component: He_show
        },
        {
          path: '/helloWorld/he_home',
          name: 'He_home',
          component: He_home
        },
        {
          path: '/helloWorld/personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: '/helloWorld/setup',
          name: 'Setup',
          component: Setup
        }
      ]
    }
  ]
})
