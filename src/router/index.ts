import { createRouter, createWebHistory } from 'vue-router'
import BackstageView from '@/views/backstage/Backstage.vue'
import Users from '@/views/backstage/components/Main/Users.vue'
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
            title:"后台管理系统"
          },
          component: Users
        }
      ]
    },
  ]
})

export default router
