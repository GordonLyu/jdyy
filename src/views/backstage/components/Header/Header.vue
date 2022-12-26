<template>
  <el-page-header :back="router.back" :icon="ArrowLeft">
    <template #content>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in routers" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
  </el-page-header>

  <div class="right">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span> 您好，{{username}} </span>
        <el-icon class="el-icon--right">
          <Avatar></Avatar>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click="signout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import Avatar from "@/components/Avatar.vue";
import { useUserInfoStore } from '@/stores/user-info'
import { removeToken } from '@/utils/token/index'

const router = useRouter();
// console.log(router.currentRoute.value.matched);

// router.currentRoute.value.meta.title
const routers = ref(router.currentRoute.value.matched);
router.afterEach((to) => {
  routers.value.splice(0, routers.value.length);
  to.matched.forEach((item) => {
    routers.value.push(item);
  });
});

//用户状态
const username = useUserInfoStore().username

    // ↓登出
    const signout = () => {
      // ↓将store重置为初始值
      useUserInfoStore().$reset()
      // ↓删除token
      removeToken()
      // ↓用router.push或replace会缓存页面，比如由admin切换到普通用户，普通用户在没刷新页面之前仍能看到admin才有权限的页面
      window.location.href = '/'
      // router.push('/login')
    }
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.el-icon--right {
  margin-right: 1rem;
}
</style>
