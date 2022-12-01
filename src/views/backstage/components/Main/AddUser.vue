<template>
  <el-form label-position="top" label-width="100px" :model="formLabelAlign">
    <el-form-item label="用户名">
      <el-input v-model="formLabelAlign.username" size="large" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="formLabelAlign.password"
        type="password"
        size="large"
      />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="formLabelAlign.role" size="large">
        <el-option label="用户" value="user" />
        <el-option label="管理员" value="admin" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import request from "@/utils/requests";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const formLabelAlign = reactive({
  username: "",
  password: "",
  role: "user",
});

const submit = () => {
  request({
    url: "user/add",
    method: "PUT",
    data: formLabelAlign,
  }).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success({
        message: res.message,
        grouping: true,
      });
    }else{
      ElMessage.warning({
        message: res.message,
        grouping: true,
      });
    }
  });
};

const reset = () => {
  formLabelAlign.username = "";
  formLabelAlign.password = "";
  formLabelAlign.role = "user";
};
</script>
<style scoped>
.el-form {
  position: relative;
  width: 80%;
  min-height: 300px;
  height: 100%;
  padding-top: 50px;
  margin: auto;
  animation: up-fade-in 0.3s;
}
</style>
