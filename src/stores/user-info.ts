import { defineStore } from 'pinia'

import router from '@/router/index'
const modulesRoutes = import.meta.glob('/src/views/*/*.vue')

// 定义用户信息Store
export const useUserInfoStore = defineStore('user-info', {
  state: () => ({
    uid: '',
    username: '未登录',
    password: '',
    role:'',
    token:''
  }),
  persist: {

    key: 'article', //缓存key

    storage: window.localStorage, //缓存方式

    // 部分持久化状态的点符号路径数组，默认持久化所有数据

    // paths: ['baseConfig', 'globalSrc', 'relationConfig'],

  },
  actions: {
    setAll(userinfo: any) {
      const { uid, username, password,role,token } = userinfo
      this.uid = uid
      this.username = username
      this.password = password
      this.role=role
      this.token=token
    },
  },
})
