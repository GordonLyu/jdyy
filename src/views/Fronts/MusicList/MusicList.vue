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
          <img :src="`http://localhost:8080/${form.cover}`" alt="">
        </div>
        <div class="boxMessage">
          <h1 class="title">{{ form.listName }}</h1>
          <div class="creator">
            <p>{{ form.creator }}</p>
            <p class="createTime"> 创建时间：{{ form.createTime }}</p>
          </div>
          <div class="btn">
            <button  @click="dialogFormVisible = true">
              <el-icon>
                <Plus />
              </el-icon>
              <span>添加</span>
            </button>
          </div>
          <p style="color:var(--color-white);">简介:</p>
          <p class="copywriting">{{ form.detail }}</p>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="musicName" label="音乐名" />
        <el-table-column prop="author" label="作者" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click='toMuiscUrl("musicPlay",scope.row)' type="primary" style="font-family:FontAwesome; background-color: transparent; border: none;">
              <span class="fa-play" style="color:#3f8ff2;"></span>
            </el-button>
            <el-button text style="background-color: transparent; border: none;" @click="open(scope)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination class="pagination" :url="'musicList/page'" :id="lid" @get-current-page-data="getCurrentPageData" />

    </div>

  </div>



 <!-- 添加音乐的弹出框 -->
 <el-dialog v-model="dialogFormVisible"  title="添加音乐">

    <AddMusic :ListId="listId" @dialogFormHidden="addMusicAfter"></AddMusic>

<!-- <template #footer>
<span class="dialog-footer">
<el-button @click="dialogFormVisible = false">Cancel</el-button>
<el-button type="primary" @click="dialogFormVisible = false">
  Confirm
</el-button>
</span>
</template> -->
</el-dialog>

</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from "@/components/Pagination.vue";
import { ref, reactive } from "vue";
import request from "@/utils/requests";
import router from '@/router/index'
import AddMusic from '@/views/Fronts/Add/AddMusic.vue'

//是否显示弹出框响应式值
const dialogFormVisible = ref(false)

//删除的提示框显示
const open = (scope: any) => {

  ElMessageBox.confirm(
    '您确定要删除此歌曲?',
    'Warning',
    {
      confirmButtonText: '好的',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      removeMusic(scope);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}

const tableData = reactive([]);//歌曲列表数据
const currentPage = ref(0);
const pageSize = ref(0);


//获取当前歌单的id
const route = useRoute()
console.log(route.params.id);
let listId:any=route.params.id



const lid=ref(Number(route.params.id));

//获取列表信息
const getCurrentPageData=(data: any)=> {
  tableData.splice(0, tableData.length);
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  console.log(data);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
}


//添加音乐后的更新操作
const addMusicAfter=(hidden:boolean)=>{
  dialogFormVisible.value = hidden
  console.log("来啦来啦！！！！");
  //重新获取数据
  getDataAgain();

}

const removeMusic=(scope: any)=> {
  //弹出框隐藏
  console.log(scope.$index, scope.row.musicId);
  // tableData.splice(scope.$index, 1);
  request({
    method: "delete",
    url: "musicList/removeMusic",
    params: {
      mid: scope.row.musicId,
      lid:listId
    },
  }).then((res) => {
    //删除后重新获取数据
    getDataAgain();
  });
}

//重新获取数据函数
const getDataAgain=()=>{
  
  
  request({
      method: "get",
      url: "musicList/page",
      params: {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        lid:listId
      },
    }).then((res) => {
      console.log(res.data);
      
      tableData.splice(0, tableData.length);
      res.data.pageData.forEach((value: never) => {
        tableData.push(value);
      });
    });
}

//点击跳转页面
const toMuiscUrl=(url: string, data:any)=> {
    // let obj = JSON.stringify(data)
    console.log(data);
    //本地存储
    window.sessionStorage.setItem("MusicData", JSON.stringify(data));
    router.push(
        {
            name: url,
        }
    )
 
}

// //获取歌单信息
// const route = useRoute(); // 第一步
// console.log(route.query); // 第二步


// const form = JSON.parse(route.query.data as any)
//获取存储本地信息
const form = JSON.parse(window.sessionStorage.getItem('MusicListData') as any)
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
  margin-right: 1rem;
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
/* 歌单信息 */
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
  /* font-size: 1vw; */
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

@media screen and (max-width:851px) {
  .message .boxMessage .btn button span {
    display: none;
  }
  /* 创建时间 */
  .message .boxMessage .creator .createTime{
      display: none;
  }

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