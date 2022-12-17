<template>
  <div class="main">
    <el-table :data="tableData" table-layout="fixed" row-key="musicId">
      <el-table-column prop="musicId" label="音乐id" />
      <el-table-column prop="musicName" label="音乐名" />
      <el-table-column prop="coverURL" label="音乐封面地址" />
      <el-table-column prop="url" label="音乐资源地址" />
      <el-table-column prop="author" label="作者" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button size="small" link type="primary"> 编辑 </el-button>
          <el-button
            size="small"
            type="danger"
            @click.prevent="isRemoveMusic(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      class="pagination"
      :jumper="true"
      :total="true"
      :sizes="true"
      :url="'music/page'"
      @get-current-page-data="getCurrentPageData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage,ElMessageBox } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import request from "@/utils/requests";
import { ref, reactive } from "vue";

const tableData = reactive([]);
const currentPage = ref(0);
const pageSize = ref(0);

function getCurrentPageData(data: any) {
  tableData.splice(0, tableData.length);
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  console.log(data);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
}

//编辑音乐
function modifyUser() {}

//是否确定删除音乐警告
const isRemoveMusic = (scope:any) =>{
  ElMessageBox.confirm(
    '是否确认删除此音乐？',
    {
      title:'删除音乐',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(()=>{//确定后
    removeMusic(scope);
  }).catch(()=>{//取消后
    
  })
}

//删除音乐
function removeMusic(scope: any) {
  request({
    method: "DELETE",
    url: "music/remove",
    params: {
      musicId: scope.row.musicId,
    },
  }).then((res:any) => {
    //删除后重新获取数据
    request({
      method: "get",
      url: "music/page",
      params: {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      },
    }).then((res) => {
      tableData.splice(0, tableData.length);//清空旧的显示数据
      res.data.pageData.forEach((value: never) => {
        tableData.push(value);
      });
    });
    if (res.code == 200) {
      ElMessage.success({
        message: res.message,
        grouping: true
      });
    }
  });
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.pagination {
  justify-content: center;
}
.el-table {
  animation: up-fade-in 0.3s;
  transition: 0.3s;
}
</style>
