import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
import adminLogin from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import card from '@/components/card/card.vue'
import Music from '@/views/backstage/components/Main/Music.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'backstage',
      meta:{
        title:"后台管理系统"
      },
      component: BackstageView,
      children:[
        {
          path: '/users',
          name: 'users',
          meta:{
            title:"后台管理系统--用户表"
          },
          component: Users
        },
        {
          path: '/music',
          name: 'music',
          meta:{
            title:"后台管理系统--音乐表"
          },
          component: Music
        },

      ]
    },
    {
      path:'/login',
      name:'adminLogin',
      component:adminLogin,
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
    },
    {
      path:'/card',
      name:'card',
      component:card,
    },
  ]
})

export default router
