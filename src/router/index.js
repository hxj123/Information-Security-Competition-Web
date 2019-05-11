import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Person from '../views/person'
import Journal from '../views/journal'
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
          path: 'journal',
          component: Journal
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
          path: 'journal',
          component: Journal
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
