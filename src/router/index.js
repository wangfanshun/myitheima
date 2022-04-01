import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/'
import my from '@/views/my/'
import layout from '@/views/layout/index'
import home from '@/views/home/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path:'/',
    // name:layout,
    component:layout,
    children:[
      {
        path:'',
        name:'home',
        component:home
      },
      {
        path:'/my',
        component:my
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
