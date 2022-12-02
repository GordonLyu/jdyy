import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
import adminLogin from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Music from '@/views/backstage/components/Main/Music.vue'
import musicFrout from '@/views/Fronts/MusicFrout.vue'
import musicPlay from '@/views/Fronts/MusicPlay/MusicPlay.vue'
import musicList from '@/views/Fronts/MusicList/MusicList.vue'

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
      path:'/musicFrout',
      name:'musicFrout',
      component:musicFrout,
      meta:{
        showFooter: true
     },
      children:[
        {
          path:'musicList',
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
