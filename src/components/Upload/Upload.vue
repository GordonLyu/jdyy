<!-- 上传 -->
<template>
  <el-upload
    v-if="!isImg"
    ref="upload"
    :http-request="uploadFile"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="true"
  >
    <template #trigger>
      <el-button type="primary">上传</el-button>
    </template>
  </el-upload>
  <UploadImg v-else @get-file="getImg" ref="uploadImg" :is-cropper="isCropper"/>
</template>

<script setup lang="ts">
/*
属性:
  isImg:boolean - 是否为图片上传模式
  isCropper:boolean - 图片上传模式下，是否需要裁剪

事件：
  @get-file->File - 获取将要上传的文件

方法：
  clearFiles()->void - 清理将要上传的文件列表
  file(UploadRawFile)->void - 手动上传文件
*/

import { ref } from "vue";
import { genFileId } from "element-plus";
import UploadImg from "./UploadImg.vue";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";

const props = defineProps<{
  isImg?: boolean; //是否为图片上传模式
  isCropper?: boolean; //图片上传模式下，是否需要裁剪
}>();

//判断是否为图片模式
const isImg = ref(false);
if (props.isImg) isImg.value = props.isImg;
const isCropper = ref(props.isCropper)

const emits = defineEmits(["getFile"]);

const upload = ref<UploadInstance>();
const uploadImg = ref();

//替换文件，限制文件上传数量
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  transFile(file);
};

const uploadFile = (options: UploadRequestOptions) => {
  transFile(options.file);
};

//传文件值出去
const transFile = (file: File) => {
  emits("getFile", file);
};

const getImg = (file: File) => {
  transFile(file);
};

//清除文件
const clearFiles = () => {
  try {
    upload.value!.clearFiles();
  } catch (e) {
    uploadImg.value!.clearFiles();
  }
};

//手动选择上传文件
const setFile = (file: UploadRawFile) => {
  try {
    upload.value!.clearFiles();
    file.uid = genFileId();
    upload.value!.handleStart(file);
  } catch (e) {
    uploadImg.value!.setFile(file);
  }
};

defineExpose({
  clearFiles,
  setFile,
});
</script>
<style>
.disabled .el-upload.el-upload--picture-card {
  display: none;
}
</style>
