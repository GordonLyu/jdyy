<template>
  <el-page-header :back="router.back" :icon="ArrowLeft">
    <template #content>
      <span class="text-large font-600 mr-3"> {{ title }} </span>
    </template>
  </el-page-header>

  <div class="right">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span> 你好，管理员 </span>
        <el-icon class="el-icon--right">
          <Avatar></Avatar>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { onBeforeRouteUpdate } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import Avatar from "@/components/Avatar.vue";

const currentRouter = ref(router.currentRoute.value);

const title = ref(currentRouter.value.meta.title);
onBeforeRouteUpdate((to) => {
  title.value = to.meta.title;
  
});
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
