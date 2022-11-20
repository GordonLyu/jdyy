<template>
    <div id="container">
        <FroutHeader/>
        <FroutSwiper/>
        <FroutSeation :dataList="dataList"/>
    </div>
</template>

<script setup lang="ts">
import FroutHeader from "@/components/FrontHeader/FroutHeader.vue";
import FroutSwiper from "@/components/FrontSwiper/FrontSwiper.vue";
import FroutSeation from "@/components/FrontSeation/FrontSeation.vue";

import { reactive } from 'vue';


// 磅单
let ListData=[
        {
            rank:1,
            name:"dddd",
            author:"dddd",
            url:'/public/image/nav1.jpg',
            clickNum:212
        },
        {
            rank:2,
            name:'sfsad',
            author:'asdfsad',
            url:'/public/image/nav1.jpg',
            clickNum:444
        },
        {
            rank:3,
            name:'sfsad',
            author:'asdfsd',
            url:'/public/image/nav1.jpg',
            clickNum:444
        },
        {
            rank:4,
            name:'sadf',
            author:'asad',
            url:'/public/image/nav1.jpg',
            clickNum:444
        },
        {
            rank:5,
            name:'sfsa',
            author:'asda',
            url:'/public/image/nav1.jpg',
            clickNum:444
        }
    ];
 
//向froutSeation传递热歌榜单数据
const dataList = reactive(ListData)



</script>

<style scoped>

#container{
    width: 100%;
}
</style>