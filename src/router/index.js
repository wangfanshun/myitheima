import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/'
import my from '@/views/my/'
import layout from '@/views/layout/index'
import home from '@/views/home/index'
import search from '../views/search/index'
import articels from '../views/articles/index'
import userProfile from '../views/user-profile/index'
Vue.use(VueRouter)

const routes = [
  {
    name:'articles',
    path:'/articles/:articleId',
    component:articels,
    props:true
  },
  {
    path: '/login',
    component: login
  },
  {
    path:'/search',
    component:search
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
  {
    path:'/user',
    name:userProfile,
    component:userProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
