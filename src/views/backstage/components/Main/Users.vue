<template>
  <div class="main">
    <el-table :data="tableData" table-layout="fixed" row-key="uid">
      <el-table-column prop="uid" label="uid" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button size="small" link type="primary"> 编辑 </el-button>
          <el-button
            size="small"
            type="danger"
            @click.prevent="removeUser(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      class="pagination"
      :url="'user/page'"
      @get-current-page-data="getCurrentPageData"
    />
  </div>
</template>

<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue";
import request from "@/utils/requests";
import { ref, reactive } from "vue";

const tableData = reactive([]);
const currentPage = ref(0);
const pageSize = ref(0);

function getCurrentPageData(data: any) {
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  console.log(currentPage.value, pageSize.value);

  tableData.splice(0, tableData.length);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
}

//编辑用户
function modifyUser() {}

//删除用户
function removeUser(scope: any) {
  console.log(scope.$index, scope.row.uid);
  // tableData.splice(scope.$index, 1);
  request({
    method: "post",
    url: "user/remove",
    params: {
      uid: scope.row.uid,
    },
  }).then((res) => {
    //删除后重新获取数据
    request({
      method: "get",
      url: "user/page",
      params: {
        pageNum: currentPage.value,
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
  animation: left-fade-in 0.3s;
  transition: 0.3s;
}
</style>
