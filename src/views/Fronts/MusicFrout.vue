<template>
    <div id="container"  v-if="$route.meta.showFooter">
        <FroutHeader/>
        <FroutSwiper/>
        <FroutSeation 
        :dataList="ListData"
        :listMusic="musicList" 
        /> 
    </div>
    <RouterView v-else/>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue";

import FroutHeader from "@/components/FrontHeader/FroutHeader.vue";
import FroutSwiper from "@/components/FrontSwiper/FrontSwiper.vue";
import FroutSeation from "@/components/FrontSeation/FrontSeation.vue";
import { ref,reactive,onMounted } from 'vue';
import { RouterView } from "vue-router";
import request from "@/utils/requests";
import { toRaw } from '@vue/reactivity';
// const FroutHeader = defineAsyncComponent(() => import('@/components/FrontHeader/FroutHeader.vue'))
// const FroutSwiper = defineAsyncComponent(() => import('@/components/FrontSwiper/FrontSwiper.vue'))
// const FroutSeation = defineAsyncComponent(() => import('@/components/FrontSeation/FrontSeation.vue'))

//删除歌单后的操作
// function musicListDeleteAfter(flag:any){
//     console.log("接受信号成功！",flag);
//     //获取所有歌单
//     getAllList();
    
// }

//榜单
let data:any = reactive({
    value:[],
});
//歌单
let data1:any = reactive({
    value:[],
});
//榜单
let ListData:any=ref([]);
//歌单
let musicList:any=ref([]);



//获取所有歌单
getAllList();

onMounted(()=>{
    //获取所有音乐
getAllMusic();
})






async function getAllMusic(){ 
await request({
  url:'/music/getAll',
}).then((res)=>{
    data.value.push(...res.data);
    console.log(res.data,9);
    ListData.value=toRaw(data.value);
    console.log(toRaw(ListData.value));
})
}
// console.log(toRaw(data.value),6);


//获取所有歌单
function getAllList(){ 
request({
  url:'/musicList/getAll',
}).then((res)=>{
    data1.value.push(...res.data);
    // console.log(res.data,9);
    musicList.value=res.data;
    // console.log(toRaw(musicList.value));
    console.log(musicList.value);
})
}
// console.log(toRaw(data.value),6);

</script>

<style>
body{
      transition: all .4s linear;
}
#container{
    width: 100%;
}

</style>