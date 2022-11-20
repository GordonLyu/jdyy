import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
import adminLogin from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import musicFrout from '@/views/fronts/musicFrout.vue'
import musicPlay from '@/views/fronts/musicPlay/musicPlay.vue'
import musicLIst from '@/views/fronts/musicList/musicLIst.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
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

      ]
    },
    {
      path:'/musicFrout',
      name:'musicFrout',
      component:musicFrout,
      children:[
        {
          path:'/musicFrout/musicList/:id',
          component: musicLIst
        },
        {
          path:'/musicFrout/musicPlay/:id',
          component:musicPlay
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
      path:'',
      redirect:'/musicFrout'
    }
  ]
})

export default router
