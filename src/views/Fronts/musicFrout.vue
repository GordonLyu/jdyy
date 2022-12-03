<template>
    <div id="container"  v-if="$route.meta.showFooter">
        <FroutHeader/>
        <FroutSwiper/>
        <FroutSeation :dataList="dataList" :listMusic="listMusic"/>
    </div>
    <RouterView v-else/>
</template>

<script setup lang="ts">
import FroutHeader from "@/components/FrontHeader/FroutHeader.vue";
import FroutSwiper from "@/components/FrontSwiper/FrontSwiper.vue";
import FroutSeation from "@/components/FrontSeation/FrontSeation.vue";
import { reactive } from 'vue';
import { RouterView } from "vue-router";

// 磅单
let ListData=[
        {
            id:1,//歌曲的id
            Lid:1,//歌单列表
            name:"我的天空",//歌曲名称
            author:"cuanzi",//歌曲作者
            url:'/public/image/nav1.jpg',//封面路径
            musicUrl:'http://localhost:8080/music/audio/mid_49.mp3',//歌曲地址
            clickNum:212//播放数
        },
        {
            id:2,
            Lid:1,//歌单列表
            name:'sfsad',
            author:'asdfsad',
            url:'/public/image/nav1.jpg',
            musicUrl:'',
            clickNum:444
        },
        {
            id:3,
            Lid:1,//歌单列表
            name:'sfsad',
            author:'asdfsd',
            url:'/public/image/nav2.jpg',
            musicUrl:'',
            clickNum:444
        },
        {
            id:4,
            Lid:1,//歌单列表
            name:'sadf',
            author:'asad',
            url:'/public/image/nav2.jpg',
            musicUrl:'',
            clickNum:444
        },
        {
            id:5,
            Lid:1,//歌单列表
            name:'sfsa',
            author:'asda',
            url:'/public/image/nav1.jpg',
            musicUrl:'',
            clickNum:444
        }
    ];
    //歌单
    let musicList=[
        {
            id:1,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav3.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:2,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav1.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:3,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:4,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:5,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:6,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:6,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },
        {
            id:6,//歌单id
            title:'我的世界',//歌单名称
            cover:'/public/image/nav2.jpg',//歌单封面路径
            creator:'cuanzi',//创建者
            createTime:"2003-05-28",
            copywriting:'hhhhhhhhhhhh',//文案
        },

    ]
 
//向froutSeation传递热歌榜单数据
const dataList = reactive(ListData)
const listMusic = reactive(musicList)





</script>

<style scoped>

#container{
    width: 100%;
}
</style>