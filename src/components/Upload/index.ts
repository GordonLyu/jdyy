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

import Upload from './Upload.vue'

export default Upload