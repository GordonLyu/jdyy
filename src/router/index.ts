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

import NProgress from '@/utils/progress'
import { existToken, removeToken } from '@/utils/token/index'
import { useUserInfoStore } from '@/stores/user-info'
import { ElMessage } from "element-plus";

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
          path:'musicPlay/:id',
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

// //前置路由守卫
// router.beforeEach((to, from, next) => {
//   //后台管理标题
//   document.title = "Vite App";
//   if(to.matched[0].path=='/admin')
//     document.title ="后台 | "+to.meta.title;
//   next()
// })


// ↓白名单
const whiteList = ['/login','/musicFrout','/register']

// ↓全局前置守卫
router.beforeEach(async (to) => {
  console.log(to);
  const userInfoStore = useUserInfoStore()
  NProgress.start()
    //后台管理标题
  document.title = "Vite App";
  if(to.matched[0].path=='/admin'){
       document.title ="后台 | "+to.meta.title;
    }
   
  // ↓如果请求地址不是白名单
  if (whiteList.indexOf(to.path) === -1) {
    // ↓如果token存在检查store，否则跳转到登录页
    if (existToken()) {
      // ↓如果没有用户信息，查询用户信息
      if (userInfoStore.username=='未登录') {
        // ↓查询成功保存用户信息且跳转到目标页
          removeToken()
          return { name: 'adminLogin', query: { redirect: `${to.path}` } }
      }
    }else{
      let userClear={
        uid: '',
        username: '未登录',
        password: '',
        role:'',
        token:''
      }
      userInfoStore.setAll(userClear);
      ElMessage.error("^_^登录后即享权益！")
      return { name: 'adminLogin', query: { redirect: `${to.path}` } }
    }
    if(to.path=='/admin'){
      if (userInfoStore.role=='admin') {
        ElMessage.success("欢迎您，管理员")
      }else{
        ElMessage.error("权限不足！！！")
        return { name: 'musicFrout', query: { redirect: `${to.path}` } }
      }
    }
  }else{
    if (userInfoStore.username!=='未登录'&&(whiteList.indexOf(to.path) === 0||whiteList.indexOf(to.path) === 2)) {
      // ↓查询成功保存用户信息且跳转到目标页
      ElMessage.error("请勿重复操作！！！")
      return { name: 'musicFrout', query: { redirect: `${to.path}` } }
    }
  }
})

// ↓全局后置钩子
router.afterEach(() => {
  NProgress.done()
})


export default router
