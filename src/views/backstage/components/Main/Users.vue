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
            @click.prevent="isRemoveUser(scope)"
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
      :url="'user/page'"
      @get-current-page-data="getCurrentPageData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage,ElMessageBox } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import { ref, reactive } from "vue";
import api from "@/api";

const tableData = reactive([]);
const currentPage = ref(0);
const pageSize = ref(0);

function getCurrentPageData(data: any) {
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  tableData.splice(0, tableData.length);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
}

//编辑用户
function modifyUser() {}

//删除用户警告
const isRemoveUser = (scope:any) =>{
  ElMessageBox.confirm(
    '是否确认删除此用户？',
    {
      title:'删除用户',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(()=>{//确定后
    removeUser(scope);
  }).catch(()=>{//取消后
    
  })
}

//删除用户
function removeUser(scope: any) {
  console.log(scope.$index, scope.row.uid);
  api.user.delete(scope.row.uid).then((res: any) => {
    //删除后重新获取数据
    api.user.getUserPage(currentPage.value,pageSize.value).then((res) => {
      tableData.splice(0, tableData.length);//清空旧的显示数据
      res.data.pageData.forEach((value: never) => {
        tableData.push(value);
      });
    });
    console.log(res);
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
