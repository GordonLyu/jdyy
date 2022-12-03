<template>
  <!-- 背景图 -->
  <div class="bg">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:0">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:1">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:2">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:3">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:4">
    <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:5">
  </div>

  <div id="list">

    <div class="musicList">
      <div class="message">
        <div class="cover">
          <img :src=form.cover alt="">
        </div>
        <div class="boxMessage">
          <h1 class="title">{{ form.title }}</h1>
          <div class="creator">
            <p>{{ form.creator }}</p>
            <p class="createTime"> 创建时间：{{ form.createTime }}</p>
          </div>
          <div class="btn">
            <button>
              <el-icon>
                <Plus />
              </el-icon>添加
            </button>
          </div>
          <p style="color:var(--color-white);">简介:</p>
          <p class="copywriting">{{ form.copywriting }}</p>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="musicName" label="音乐名" />
        <el-table-column prop="author" label="作者" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary"
              style="font-family:FontAwesome; background-color: transparent; border: none;"><span class="fa-play"
                style="color:#3f8ff2;"></span></el-button>
            <el-button text style="background-color: transparent; border: none;" @click="open(scope)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination class="pagination" :url="'music/page'" @get-current-page-data="getCurrentPageData" />


    </div>

  </div>




</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from "@/components/Pagination.vue";
import { ref, reactive } from "vue";
import request from "@/utils/requests";

//删除的提示框显示
const open = (scope: any) => {

  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
      removeMusic(scope);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const tableData = reactive([]);//歌曲列表数据
const currentPage = ref(0);
const pageSize = ref(0);

//获取列表信息
function getCurrentPageData(data: any) {
  tableData.splice(0, tableData.length);
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  console.log(data);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
}

function removeMusic(scope: any) {
  //弹出框隐藏
  console.log(scope.$index, scope.row.musicId);
  // tableData.splice(scope.$index, 1);
  request({
    method: "delete",
    url: "music/remove",
    params: {
      musicId: scope.row.musicId,
    },
  }).then((res) => {
    //删除后重新获取数据
    request({
      method: "get",
      url: "music/page",
      params: {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      },
    }).then((res) => {
      tableData.splice(0, tableData.length);
      res.data.pageData.forEach((value: never) => {
        tableData.push(value);
      });
    });

    console.log(res);
  });
}


//获取歌单信息
const route = useRoute(); // 第一步
console.log(route.query); // 第二步

const form = JSON.parse(route.query.data as any)
console.log(form, 6);



</script>

<style scoped>
.pagination {
  background-color: var(--color-white);
}

#list {
  width: 100%;
  height: 100%;
  /* border-top: 5px solid var(--color-theme); */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#list .musicList {
  width: 80%;
  min-width: 30rem;
  /* height: 50rem; */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  /*-webkit-backdrop-filter: blur(1px); */
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  /* 优化高斯模糊 */
  transform: translateZ(0);
}

/* 背景圆*/
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: linear-gradient(180deg, #2f6ed3 5%, #5095e4 20%, #5095e4 60%, #2f6ed3 95%);
  z-index: -1;
}

/* 背景圆 */
/* 背景圆动画 */

@keyframes animate {

  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}

.bg>img {
  position: absolute;
  animation: animate 10s linear infinite;
  animation-delay: calc(var(--x) * -10s);
}

.bg>img:nth-of-type(1) {
  width: 15%;
  top: 10%;
  left: 70%;

}

.bg>img:nth-of-type(2) {
  width: 25%;
  top: 20%;
  left: 10%;

}

.bg>img:nth-of-type(3) {
  width: 10%;
  top: 40%;
  left: 50%;

}

.bg>img:nth-of-type(4) {
  width: 30%;
  top: 50%;
  left: 60%;

}

.bg>img:nth-of-type(5) {
  width: 15%;
  top: 70%;
  left: 15%;

}

.bg>img:nth-of-type(6) {
  width: 15%;
  top: 5%;
  left: 35%;

}

.message {
  width: 100%;
  height: 20rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.647);
  /* border-radius: 10px; */
  display: flex;
  padding: 1.5rem;
}

/* 封面 */
.message .cover {
  width: auto;
  height: 90%;

}

.message .cover img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

/* 歌单信息 */
.message .boxMessage {
  width: 50%;
  height: 90%;
  /* border: 1px solid; */
}

/* 歌曲名字 */
.message .boxMessage .title {
  font-size: 2rem;
  padding-left: 1rem;
  color: var(--color-white);
}

/* 作者信息 */
.message .boxMessage .creator {
  width: 100%;
  height: 14%;
  display: flex;
  /* border: 1px solid; */
}

.message .boxMessage .creator p {
  height: 100%;
  /* border: 1px solid; */
  /* color: rgb(88, 88, 88); */
  width: max-content;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.message .boxMessage .creator p:nth-of-type(1) {

  font-size: 25px;
  color: white;
  margin-left: 1rem;
  /* text-shadow: 0px 0px 3px black; */
}

.message .boxMessage .creator p:nth-of-type(2) {

  font-size: 12px;
  /* color: var(--color-white); */
  color: rgb(44, 43, 43);
  margin-left: .5rem;
  /* vertical-align: middle; */

}

/* 添加 */
.message .boxMessage .btn {
  min-width: 5rem;
  width: 80%;
  height: 4.5rem;
  /* border: 1px solid; */
  margin: 0 .5rem .5rem 1rem;
  display: flex;
  align-items: center;

}

.message .boxMessage .btn button {
  outline: none;
  border: none;
  width: 30%;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  column-gap: .3rem;
  justify-content: center;
  color: var(--color-white);
  font-size: 15px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  /*-webkit-backdrop-filter: blur(1px); */
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  /* 优化高斯模糊 */
  transform: translateZ(0);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}


.message .boxMessage>p:nth-of-type(1) {
  margin-left: 1rem;
}

.message .boxMessage .copywriting {
  width: 95%;
  height: 50%;
  /* border: 1px solid; */
  margin-left: 1rem;
  word-break: break-all;
  color: var(--color-white);
  text-shadow: 0px 0px 0px black;
  padding: .5rem;
  padding-left: 0;
}
</style>