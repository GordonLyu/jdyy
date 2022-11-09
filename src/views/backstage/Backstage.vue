<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto" class="menu"><Menu></Menu></el-aside>
      <el-container>
        <el-header height="80px" class="header"><Header></Header></el-header>
        <el-main><RouterView/></el-main>
        <el-footer><Footer></Footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header/Header.vue";
import Menu from "./components/Menu/Menu.vue";
import Footer from "./components/Footer/Footer.vue";

var headerHight = "80px";
</script>

<style>
#app {
  height: 100%;
}
.menu{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header.header{
  padding: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
}
</style>
