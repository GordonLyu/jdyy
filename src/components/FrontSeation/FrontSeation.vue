<template>
    <div id="seation">
        <!-- 背景图 -->
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:0">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:1">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:2">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:3">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="图片迷路了~" style="--x:3">

        <div>
            <div class="musicSheetList">
                <h1>精选歌单</h1>
                <div class="box">
                    <div v-for="item in firstItem" :key="item.lid" >
                        <img :src="`http://localhost:8080/${item.cover}`" alt="">
                        <div>
                            <p class="fa-user-plus" style="font-weight: lighter;">&nbsp;{{ item.creator }}</p>
                            <p>{{ item.listName }}</p>
                            <p>{{ item.detail }}</p>
                        </div>

                    </div>
                            <div v-for="(item,index) in smallItem" 
                                :item="item" 
                                :index="index" 
                                :key="item.lid" 
                                @click='toMusicListUrl("musicList",item,item.lid)'
                            >
                                <strong class="fa-user-plus" style="font-weight: lighter;"><span>&nbsp;{{ item.creator }}</span></strong>
                                <img :src="`http://localhost:8080/${item.cover}`" >
                                <p>
                                    <icon class="fa-music"></icon>&nbsp; {{ item.listName }}
                                </p>
                            </div>
                    
                   

                </div>

                <Pagination class="pagination" :url="'musicList/pageList'" @get-current-page-data="getCurrentPageData" />

            </div>


            <div class="RankingList">
                <h1>热门榜单</h1>
                <div class="item" 
                        v-for="(item,index) in rankItem" 
                        :item="item" 
                        :index="index"  
                        :key="item.musicId" 
                        @click='toMuiscUrl("musicPlay",item)'
                >
                    <div class="rank">{{index+1}}</div>
                    <div class="picture"  >
                        <img :src="`http://localhost:8080/${item.coverURL}`">
                    </div>
                    <div class="author">
                        <span>{{ item.musicName }}</span><span>&nbsp;- {{ item.author }}</span>
                    </div>
                    <div class="clickNum">
                        点击数：<span>{{ item.clickNumber }}</span>
                    </div>
                </div>

                <h1>推荐音乐 
                    <el-icon @click="ClickRefresh" class="refresh">
                        <Refresh />
                    </el-icon>
                </h1>
                <el-skeleton :rows="5" animated :loading="loading"  style="margin: 1rem 0;">
                    <template #template>
                       
                    </template>
                    <template #default>

                        <div class="item" 
                                v-for="(item,index) in recommendedMusicList" 
                                :item="item" 
                                :index="index"  
                                :key="index" 
                                @click='toMuiscUrl("musicPlay",item)'
                        >
                            <div class="rank">{{index+1}}</div>
                            <div class="picture"  >
                                <img :src="`http://localhost:8080/${item.coverURL}`" >
                            </div>
                            <div class="author">
                                <span>{{ item.musicName }}</span><span>&nbsp;- {{ item.author }}</span>
                            </div>
                            <div class="clickNum">
                                点击数：<span>{{ item.clickNumber }}</span>
                            </div>
                        </div>

                    </template>
                </el-skeleton>
                



            </div>



        </div>

    </div>

</template>

<script setup lang="ts">
import router from '@/router/index'
import Pagination from "@/components/Pagination.vue";
import { ref, reactive } from "vue";
import {Refresh} from '@element-plus/icons-vue'


const recommendedMusicList:any[]=reactive([]);
const tableData = reactive([]);//歌曲列表数据
const currentPage = ref(0);//分页的当前页数
const pageSize = ref(0);//分页的当前页数据量
const loading=ref(true)//懒加载
//大封面的数据
let smallItem: any = [];
smallItem=tableData




//获取列表信息
const getCurrentPageData=(data: any)=> {
  tableData.splice(0, tableData.length);
  currentPage.value = data.currentPage;
  pageSize.value = data.pageSize;
  console.log(data);
  data.list.forEach((value: never) => {
    tableData.push(value);
  });
 
}

//从父组件获取到的榜单数据和歌单数据
const props = defineProps<{
    dataList: any[],
    listMusic: any[]
}>()



//随机获取推荐音乐
const getMusicData=()=>{
    let dataNumber=props.dataList.length//音乐数据量
    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random()*dataNumber);
         recommendedMusicList.push(props.dataList[randomNumber]);//根据随机数随机获取音乐
    }
    console.log(recommendedMusicList);
    
    // x.classList.remove('active')
}

//随机获取推荐音乐
//骨架屏加载
    loading.value = true
setTimeout(() => {
    loading.value = false
    getMusicData();
}, 1000);



//点击刷新推荐歌单
const ClickRefresh=()=>{

    //骨架屏加载
    loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
    let e= document.querySelectorAll('.refresh')[0]//点击刷新控件

    recommendedMusicList.splice(0,5)
    e.classList.add('active')
    //随机获取推荐音乐
    getMusicData();

    setTimeout(() => {
    e.classList.remove('active')
    }, 1000);
}

//大封面的数据
let firstItem: any = [];
firstItem.push(props.listMusic[0]);

//榜单数据取点击数前五
const rankItem:any[]=props.dataList.sort((a,b)=>b.clickNumber-a.clickNumber).splice(0,5);



//点击跳转音乐页面
const toMuiscUrl=(url: string, data:any,id?:number)=> {
    // let obj = JSON.stringify(data)
    console.log(data);
    //本地存储
    window.sessionStorage.setItem("MusicData", JSON.stringify(data));
    router.push(
        {
            name: url,
            params: {
                id:id,
            }
        }
    )
 
}


//点击跳转歌单页面
const toMusicListUrl=(url: string, data:any,id?:number)=> {
    // let obj = JSON.stringify(data)
    console.log(data);
    //本地存储
    window.sessionStorage.setItem("MusicListData", JSON.stringify(data));
    router.push(
        {
            name: url,
            params: {
                id:id,
            }
        }
    )
 
}



</script>

<style scoped>
*{
    transition: all .5s;
}
.el-icon{
    margin-left: 1rem;
    cursor: pointer;
}
.el-icon.active{

    animation: rotate 5s cubic-bezier(0.075, 0.82, 0.165, 1) ;
}

@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}

h1:nth-of-type(2){
    margin: 1rem 0;
    display: flex;
    align-items: center;
}

#seation {

    width: 100%;
    height:auto;
    /* border-top: 5px solid var(--color-theme); */
    background-image: linear-gradient(180deg, #2f6ed3 5%, #5095e4 20%, #5095e4 60%, #2f6ed3 95%);
    
    position: relative;
    /* margin-top: 46rem; */
    overflow: hidden;
    padding-bottom: 2rem;
}

#seation>div {
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--color-white);
    display: flex;
    flex-wrap: wrap;
}


/* 背景圆动画 */

@keyframes animate {

    0%,
    100% {
        transform: translateY(-50px);
    }

    50% {
        transform: translateY(50px);
    }
}

/* 背景圆*/
#seation>img {
    position: absolute;
    animation: animate 10s linear infinite;
    animation-delay: calc(var(--x) * -10s);
}

#seation>img:nth-of-type(1) {
    width: 15%;
    top: 10%;
    left: 55%;

}

#seation>img:nth-of-type(2) {
    width: 25%;
    top: 20%;
    left: 10%;

}

#seation>img:nth-of-type(3) {
    width: 10%;
    top: 40%;
    left: 50%;

}

#seation>img:nth-of-type(4) {
    width: 30%;
    top: 50%;
    left: 57%;

}

#seation>img:nth-of-type(5) {
    width: 15%;
    top: 60%;
    left: 25%;

}

#seation h1 {
    color: rgb(255, 255, 255);
    /* color: gray; */
    text-shadow: 0px 0px 2px rgb(212, 211, 211);
    letter-spacing: 5px;

}

/* 歌曲排行榜 */
#seation div .RankingList {
    min-width: 460px;
    width: 100%;
    flex:1;
    /* height: 40rem; */
    /* border: 1px solid; */
    /* border-right: 5px solid var(--color-theme); */
    height: max-content;
    padding: 1rem;
    margin: 3rem 3rem 0 3rem;
    /* padding-left: 0; */
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    /* backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    /* 优化高斯模糊 */
    transform: translateZ(0);
}

#seation div .RankingList .item {
    /* min-width: 20rem; */
    height: 4rem;
    margin-top: 20px;
    display: flex;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    /* backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    /* 优化高斯模糊 */
    transform: translateZ(0);
}

#seation div .RankingList .item:nth-of-type(-n+3) {
    color: red;
}

#seation div .RankingList .item .rank {
    min-width: 3rem;
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#seation div .RankingList .item .picture {
    max-width: 3rem;
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

#seation div .RankingList .item .picture img {
    width: 100%;
    cursor: pointer;
    border-radius: 50%;
}

#seation div .RankingList .item .author {
    width: 40%;
    display: flex;
    align-items: center;
    margin-left: 5%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    cursor: pointer;
}

#seation div .RankingList .item .author span:nth-of-type(2) {
    font-size: 14px;
    color: rgb(141, 140, 140);
    cursor: pointer;
}

#seation div .RankingList .item .clickNum {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5%;
    font-size: .5vw;
    color: rgb(141, 140, 140);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#seation div .RankingList .item .clickNum span {
    font-size: .9vw;
    font-weight: 900;
    color: var(--color-white);
}

/* 歌单列表 */
#seation div .musicSheetList {
    flex:2;
    /* min-width: 360px; */
    /* width: 100%; */
    padding: 1rem;

    margin: 3rem 0 0 3rem;
    /* margin-right: 1rem; */
    /* padding-left: 0; */
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    /* backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    /* 优化高斯模糊 */
    transform: translateZ(0);
    display: flex;
    flex-direction: column;
}

/* 包含歌单的盒子 */
#seation div .musicSheetList .box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-bottom: 4rem;
}

/* 精选歌单的大封面盒子 */
#seation div .musicSheetList .box>div:nth-of-type(1) {
    width: 100%;
    /* height: 28rem; */
    /* border: 1px solid; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    /* 优化高斯模糊 */
    transform: translateZ(0);
    background-color: #2f6ed3;
    position: relative;
    /* padding: 1rem; */

}

/* 精选歌单的大封面 */
#seation div .musicSheetList .box>div:nth-of-type(1)>img {
    flex: 1;
    min-width: 20rem;
    aspect-ratio: 1/1;
    margin: 10% 5%;
    /* height: 100%; */
    border-radius: 50%;
    /* background-color: aliceblue; */
    object-fit: cover;
    /* border-radius:10px 0 0 10px;  */
    /* animation: rot 10s linear infinite; */
}

@keyframes rot {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}

/* 精选歌单的简介以及歌单名的盒子*/
#seation div .musicSheetList .box>div:nth-of-type(1)>div {
    /* width: 50%; */
    /* height: 100%; */
    display: flex;
    margin: 5% 1% 0 1% ;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    /* border-radius:0 10px 10px 0;  */
    cursor: pointer;
}

#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(2),
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(3) {
    min-width: 20rem;
    height: 5rem;
    /* border: 1px solid; */
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 1vw;
    font-size: 3rem;
    color: var(--color-white);
    font-weight: 900;
}

#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(3) {
    height: 3rem;
    font-size: 1rem;
}

/* 精选歌单的创建者 */
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(1) {
    position: absolute;
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    top: 0px;
    left: -100.4%;
    /* border-radius:10px 0 0 0; */
    /* border: 1px solid; */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    font-family: FontAwesome;
}

/* 小歌单 */
#seation div .musicSheetList .box div:nth-of-type(n+2) {
    width: auto;
    height: 14rem;
    /* border: 1px solid; */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 4rem;
    position: relative;
    font-family: FontAwesome;
    cursor: pointer;
}
/* 作者 */
#seation div .musicSheetList .box div:nth-of-type(n+2) strong {
    width: 5rem;
    height: 2rem;
    display: flex;
    /* justify-content: space-around; */
    padding-left: .3rem;
    align-items: center;
    color: var(--color-white);
    /* font-size: .5vw; */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    position: absolute;
    /* border: 1px solid; */
    
}

#seation div .musicSheetList .box div:nth-of-type(n+2) strong span{
    display: inline-block;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 2px;
    /* border: 1px solid; */
}

#seation div .musicSheetList .box div:nth-of-type(n+2) img {
    width: 100%;
    height: 14rem;
    object-fit: cover;
}

#seation div .musicSheetList .box div:nth-of-type(n+2) p {
    width:100%;
    height: 2rem;
    display: flex;
    align-items: center;
    padding-left: .5rem;
    font-size: 12px;
    box-shadow: rgba(221, 221, 228, 0.25) 0px 2px 5px -1px,
        rgba(28, 25, 25, 0.3) 0px 1px 3px -1px;
    color: var(--color-white);
}


@media screen and (max-width:865px) {
    #seation div .musicSheetList {
        margin: 3rem 3rem 0 3rem;
    }

    #seation div .RankingList{
       
    }

}
@media screen and (max-width:613px) {
    #seation div .musicSheetList {
        height: auto;
    }
    #seation div .musicSheetList .box div:nth-of-type(n+2){
        height: 20rem;
        margin-top: 5rem;
    }
    #seation div .musicSheetList .box div:nth-of-type(n+2) img{
       height: 100%;

    }
}
@media screen and (max-width:1483px) {
    #seation div .musicSheetList {
        min-width:80%;
        margin: 3rem 3rem 0 3rem;
    }

    #seation div .RankingList{
        min-width:80%;
    }
}
</style>