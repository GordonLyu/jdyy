<template>
  <el-container>
      <el-aside width="auto" class="a-scroll"><Menu></Menu></el-aside>
      <el-container>
        <el-header height="80px"><Header></Header></el-header>
        <el-main class="a-scroll"><RouterView></RouterView></el-main>
        <el-footer height="75px"><Footer></Footer></el-footer>
      </el-container>
    </el-container>
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
body{
  height: 100%;
}

body::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  background-color: rgb(235, 235, 235);
}
body::-webkit-scrollbar-thumb{
  border-radius: 5px;
	box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: rgba(0,0,0,0.2);
}
.el-aside{
  display: flex;
  flex-direction: column;
}
.el-header{
  padding: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
}
main.el-main{
  height: 100%;
  min-height: 120px;
  padding: 0;
  overflow: auto;
}

.el-container{
  height: 100%;
}
</style>
