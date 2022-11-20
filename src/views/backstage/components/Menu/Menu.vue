<template>
  <div class="logo">
    <icon-menu class="icon"/>
  </div>
    <el-menu
      default-active="2"
      class="main"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>分析表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">分析表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2" @click="to('users')">
        <el-icon><icon-menu /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="3" @click="to('music')">
        <el-icon><icon-menu /></el-icon>
        <template #title>音乐管理</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import {
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  import router from '@/router/index'

  
  const isCollapse = ref(false)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  function to(url:string){
    router.push(url);
  }


  //当窗口小于700时隐藏文本
  isCollapse.value =  window.innerWidth<700?true:false;
  window.onresize=()=>{
    isCollapse.value =  window.innerWidth<700?true:false;
  }
  </script>
  
  <style scoped>

  .main:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu{
    border: none;
    height: 100%;
  }
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 80px;
    margin: 0 auto;
  }
  </style>
  