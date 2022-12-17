<template>
  <el-form label-position="top" label-width="100px" :model="form">
    <el-form-item label="音乐名">
      <el-input v-model="form.musicName" size="large" />
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.author" size="large" />
    </el-form-item>
    <el-form-item label="封面">
      <Upload
        @get-file="getCoverFile"
        is-img
        is-cropper
        ref="uploadImgRef"
      ></Upload>
    </el-form-item>
    <el-form-item label="音乐文件">
      <Upload @get-file="getMusicFile" ref="uploadRef"></Upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import Upload from "@/components/Upload";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import api from "@/api";

const form = reactive({
  musicName: "",
  author: "",
  musicFile: "",
  coverFile: "",
});

const uploadRef = ref();
const uploadImgRef = ref();

//获取音乐的文件放到formData里面
const getCoverFile = (file: any) => (form.coverFile = file);

//获取音乐的文件放到formData里面
const getMusicFile = (file: any) => (form.musicFile = file);

const submit = () => {
  api.music.addMusic(form).then((res: any) => {
    console.log(res);
    //添加正常
    if (res.code == 200) {
      ElMessage.success({
        message: res.message,
        grouping: true,
      });
    } else {
      ElMessage.warning({
        message: res.message,
        grouping: true,
      });
    }
  });
};

const reset = () => {
  form.musicName = "";
  form.author = "";
  uploadRef.value!.clearFiles();
  uploadImgRef.value!.clearFiles();
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
