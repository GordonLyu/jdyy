<template>
  <div class="logo">
    <img src="@/assets/image/logo/logo.png" :class="iconClassName" />
  </div>
  <el-menu
    default-active="2-2"
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
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="to('addUser')">添加用户</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="2-2" @click="to('users')">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>音乐管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="to('addMusic')">添加音乐</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="3-2" @click="to('music')">音乐管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import router from "@/router/index";

const iconClassName = ref('icon')
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const to=(url: string)=> {
  router.push({
    name:url
  });
}

//当窗口小于700时隐藏文本
(window.onresize = () => {
  isCollapse.value = window.innerWidth < 700 ? true : false;
  iconClassName.value = 'icon '+(window.innerWidth < 700?'small':'')
})();

window.onresize;
</script>

<style scoped>
.main:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border: none;
  height: 100%;
  background-color: transparent;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 80px;
  margin: 0 auto;
}
.icon{
  margin: 0 auto;
  width: 100%;
  transition: 1s;
}

.icon.small{
  margin: 0 auto;
  width: 60%;
}
</style>
