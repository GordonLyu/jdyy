<!-- 图片裁剪 -->
<template>
  <VuePictureCropper
    :boxStyle="{
      width: '250px',
      height: '250px',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'move',
      canScale: false, 
      aspectRatio: 1 / 1,
      scalable:false
      
    }"
    class="PictureCropper"
  />
</template>

<script setup lang="ts">
/*
方法：
    showFromEvent(Event)->void - 把图片显示在裁剪内容上
    showFromFile(File)->void - 把图片显示在裁剪内容上
    getImg()->string - 获取裁剪后的base64格式的图片地址
    getImgFile()->File - 获取图片文件
*/

import { ref } from "vue";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const pic = ref<string>("");
const DataURL = ref<string>("");
pic.value = "";

//显示图片--形参为Event类型
const showFromEvent = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { files } = target; //获取input中的文件
  if (!files) return;
  const file: File = files[0];

  // 转换为base64传给裁切组件
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => {
    // 更新裁切弹窗的图片源
    pic.value = String(reader.result);

  };
};

//显示图片--形参为File类型
const showFromFile = (file: File) => {  
  // 转换为base64传给裁切组件
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => {
    // 更新裁切弹窗的图片源
    pic.value = String(reader.result);
  };
};

//获取裁剪后的图片
const getImg = () => {
  DataURL.value = cropper.getDataURL();
  return DataURL.value;
};

//获取裁剪后的图片文件
const getImgFile = async () => {
  const fileData = cropper.getFile();
  const file = ref();
  await fileData.then((value: any) => {
    file.value = value;
  });
  return file.value;
};

defineExpose({
  getImg,
  getImgFile,
  showFromEvent,
  showFromFile,
});
</script>

<style>
.PictureCropper{
  padding: 0;
  margin: 0 !important;
}
</style>
