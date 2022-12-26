<!-- 分页 -->
<!-- 含有 数据量显示、页大小选择、跳页 -->
<template>
  <el-pagination
    flex
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[8, 15, 20, 50, 100]"
    :small="small"
    :disabled="disabled"
    :background="props.background"
    :layout="`${props.total ? 'total' : ''},${
      props.sizes ? 'sizes,' : ''
    }, prev, pager, next,${props.jumper ? 'jumper' : ''}`"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
/*
属性：
  url:string - 请求地址
  total - 是否显示数据量
  sizes - 是否显示分页大小选择
  jumper - 是否显示跳页
  background - 是否显示背景

事件：
  @get-current-page-data -> object - 获取当前页返回的数据
*/

import request from "@/utils/requests";
import { ref } from "vue";

//子组件接收父组件
const props = defineProps<{
  url?:String,//请求地址
  id?:number//歌单id
  total?: Boolean; //是否显示数据量
  sizes?: Boolean; //是否显示分页大小选择
  jumper?: Boolean; //是否显示跳页
  background?: Boolean; //是否显示背景
}>();

//子组件传值给父组件
const emits = defineEmits(["getCurrentPageData"]);

const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(8);
const small = ref(false);
const disabled = ref(false);



//页数大小
const handleSizeChange = (val: number) => {
  getCurrentPage(currentPage.value, val);
};

//当前页
const handleCurrentChange = (val: number) => {
  getCurrentPage(val, pageSize.value);
};

getCurrentPage(1, 8);

//获取当前页的数据
function getCurrentPage(PN: number, PS: number) {
  request({
    url: `${props.url}`,
    params: {
      currentPage: PN,
      pageSize: PS,
    lid:props.id,
    },
  
  }).then((res) => {
    console.log(res);
    total.value = res.data.allDataSum;
    let data = {
      pageSize: pageSize.value,
      currentPage: currentPage.value,
      lid:props.id,
      list: res.data.pageData,
    };
    emits("getCurrentPageData", data);
  });
}
</script>

<style scoped></style>
