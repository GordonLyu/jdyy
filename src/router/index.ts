import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import AddUser from '@/views/backstage/components/Main/AddUser.vue'
import AddMusic from '@/views/backstage/components/Main/AddMusic.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
import Music from '@/views/backstage/components/Main/Music.vue'
import Test from '@/views/backstage/components/Main/Test.vue'

import adminLogin from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import MusicFrout from '@/views/Fronts/MusicFrout.vue'
import musicPlay from '@/views/Fronts/MusicPlay/MusicPlay.vue'
import musicList from '@/views/Fronts/MusicList/MusicList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //后台管理
    {
      path: '/admin',
      name: 'backstage',
      meta:{
        title:"首页"
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
            title:"用户管理"
          },
          component: Users
        },{
          path: 'music',
          name: 'music',
          meta:{
            title:"音乐管理"
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
      component:MusicFrout,
      meta:{
        showFooter: true
      },
      children:[
        {
          path:'musicList/:id',
          name:'musicList',
          component: musicList,
          meta:{
            showFooter: false
         }
        },
        {
          path:'musicPlay',
          name:'musicPlay',
          component:musicPlay,
          meta:{
            showFooter: false
         }
        },
      ],
      
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

//前置路由守卫
router.beforeEach((to, from, next) => {
  //后台管理标题
  document.title = "Vite App";
  if(to.matched[0].path=='/admin')
    document.title ="后台 | "+to.meta.title;
  next()
})

export default router
