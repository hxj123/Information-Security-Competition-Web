import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Person from '../views/person'
import Manage from '../views/manage'
import Defense from '../views/defense'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
        {
          path: 'person',
          component: Person
        },
        {
          path: 'manage',
          component: Manage
        },
        {
          path: 'defense',
          component: Defense
        }
      ]
    },
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:'person',
          component: Person
        },
        {
          path: 'manage',
          component: Manage
        },
        {
          path: 'defense',
          component: Defense
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    }
  ]
})
