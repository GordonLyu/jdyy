<template>
  <el-upload
    :class="{ disabled: uploadCardHidden }"
    list-type="picture-card"
    :limit="1"
    :auto-upload="true"
    :http-request="unloaded"
    ref="uploadRef"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <!-- 图片放大弹出框 -->
  <el-dialog v-model="dialogZoomVisible" width="60%">
    <img w-full :src="dialogImageUrl" alt="预览图片" style="width: 100%" />
  </el-dialog>

  <!-- 图片裁剪弹出框 -->
  <el-dialog
    v-model="dialogCropperVisible"
    title="裁剪"
    width="600px"
    :show-close="false"
    class="dialog"
  >
    <div class="box">
      <div class="crop-box">
        <PictureCropper ref="cropperRef" @click="getImgUrl" />
        <div class="view">
          <img :src="DataURL" alt="" width="200" height="200" />
          <h1>预览图片</h1>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="enterCropperIt(true)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
/*
属性：
  isCropper:boolean - 是否需要裁剪

事件：
  @get-file->File - 获取将要上传的文件

方法：
  clearFiles()->void - 清理将要上传的文件列表
  setFile(UploadRawFile)->void - 手动上传文件
*/

import PictureCropper from "./PictureCropper.vue";
import { ref } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { genFileId } from "element-plus";
import type {
  UploadFile,
  UploadInstance,
  UploadRequestOptions,
  UploadRawFile,
} from "element-plus";

const props = defineProps<{
  isCropper?: boolean; //是否需要裁剪
}>();

const isCropper = ref(props.isCropper);
const emits = defineEmits(["getFile"]);
const uploadCardHidden = ref(false);
const dialogImageUrl = ref("");
const dialogZoomVisible = ref(false);
const disabled = ref(false);
const DataURL = ref();
const uploadRef = ref<UploadInstance>();
const cropperRef = ref();

const handleRemove = async (file: UploadFile | unknown) => {
  uploadRef.value!.clearFiles();
  uploadCardHidden.value = false;
};

//放大 -- 有些许bug
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogZoomVisible.value = true;
};

//上传文件后
const unloaded = (options: UploadRequestOptions) => {
  getFile(options.file); //打开
  emits("getFile", options.file); //传文件值出去
  uploadCardHidden.value = true;
};

//手动选择上传文件
const setFile = (file: UploadRawFile) => {
  clearFiles();
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
  uploadCardHidden.value = true;
};

const clearFiles = () => {
  handleRemove(null);
};

/* ---------------裁剪弹出框--------------- */

const dialogCropperVisible = ref(false);

//预览该裁剪图片
const getImgUrl = () => {
  DataURL.value = cropperRef.value!.getImg();
};

//确认该裁剪图片
const enterCropperIt = async (showPOP: boolean) => {
  dialogCropperVisible.value = !showPOP; //是否显示弹出框
  await sleep(100);
  const file: UploadRawFile = await cropperRef.value!.getImgFile(); //获取裁剪的图片
  setFile(file); //手动上传图片
  emits("getFile", file);
};

//关闭
const cancel = (f: boolean) => {
  clearFiles();
  dialogCropperVisible.value = false;
};

//获取文件
const getFile = async (file: File) => {
  if (!isCropper.value) {
    return;
  }

  dialogCropperVisible.value = true;
  await sleep(100);
  cropperRef.value!.showFromFile(file);
  await enterCropperIt(false);
  getImgUrl();
  uploadCardHidden.value = true;
};

//睡眠
const sleep = (ms: number) =>
  new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });

defineExpose({
  setFile,
  clearFiles,
});
</script>
<style>
.disabled .el-upload.el-upload--picture-card {
  display: none;
}
.el-upload.el-upload--picture-card {
  width: 157px;
  height: 157px;
}
.box {
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
}
.crop-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.view h1 {
  margin-top: 25px;
  text-align: center;
}
.view img {
  border-radius: 5px;
  box-shadow: 2px 2px 5px 0 rgb(129, 129, 129);
}
.box .el-button {
  margin: 10px 0;
}
</style>
