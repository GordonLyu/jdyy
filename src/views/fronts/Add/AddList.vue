<template>
  <el-form label-position="top" label-width="100px" :model="formLabelAlign">
    <el-form-item label="歌单名">
      <el-input v-model="formLabelAlign.listName" size="large" />
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="formLabelAlign.creator" maxlength="6" placeholder="最多6位字符" show-word-limit
        type="text" />
    </el-form-item>
    <el-form-item label="封面">
      <Upload @get-file="getCoverFile" is-img is-cropper ref="uploadImgRef"></Upload>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="formLabelAlign.detail" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import request from "@/utils/requests";
import Upload from "@/components/Upload";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const formData = new FormData();
const formLabelAlign = reactive({
  listName: "",
  creator: "",//作者
  detail: ""//简介
});


const uploadImgRef = ref();

// //解决 'for in' 遍历，获取值时 ts报错问题
const isValidKey = (
  key: string | number | symbol,
  object: object
): key is keyof typeof object => {
  return key in object;
};

//获取音乐的文件放到formData里面
const getCoverFile = (file: any) => {
  console.log(file);

  formData.set("coverFile", file);
};


const submit = () => {
  for (let key in formLabelAlign) {
    if (isValidKey(key, formLabelAlign)) {
      formData.set(key, formLabelAlign[key]);
    }
  }
  request({
    url: "musicList/add",
    method: "PUT",
    data: formData,
  }).then((res: any) => {
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
  formLabelAlign.listName = "";
  formLabelAlign.creator = "";
  uploadImgRef.value!.clearFiles();
};
</script>
<style scoped>
.el-form {
  position: relative;
  width: 80%;
  min-height: 300px;
  height: 100%;
  margin: auto;
  animation: up-fade-in 0.3s;
}
</style>
