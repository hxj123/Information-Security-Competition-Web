import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Person from '../views/person'
import Journal from '../views/journal'
import Detail from '../views/detail'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Index,
      redirect: '/person',
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
          path: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/person',
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
          path: 'detail',
          component: Detail
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
