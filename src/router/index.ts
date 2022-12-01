import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import AddUser from '@/views/backstage/components/Main/AddUser.vue'
import AddMusic from '@/views/backstage/components/Main/AddMusic.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
import Music from '@/views/backstage/components/Main/Music.vue'
import Test from '@/views/backstage/components/Main/Test.vue'

import adminLogin from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import musicFrout from '@/views/fronts/musicFrout.vue'
import musicPlay from '@/views/fronts/musicPlay/musicPlay.vue'
import musicLIst from '@/views/fronts/musicList/musicLIst.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //后台管理
    {
      path: '/admin',
      name: 'backstage',
      meta:{
        title:"后台管理系统"
      },
      component: BackstageView,
      children:[
        {
          path: 'addUser',
          name: 'addUser',
          meta:{
            title:"添加用户"
          },
          component: AddUser
        },{
          path: 'addMusic',
          name: 'addMusic',
          meta:{
            title:"添加音乐"
          },
          component: AddMusic
        },{
          path: 'users',
          name: 'users',
          meta:{
            title:"用户表"
          },
          component: Users
        },{
          path: 'music',
          name: 'music',
          meta:{
            title:"音乐表"
          },
          component: Music
        },{
          path: 'test',
          name: 'test',
          meta:{
            title:"测试"
          },
          component: Test
        },

      ]
    },

    //前台
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

    //登录
    {
      path:'/login',
      name:'adminLogin',
      component:adminLogin,
    },

    //注册
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
