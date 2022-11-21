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
                    <div v-for="item in firstitem" :key="item.id">
                        <img :src=item.cover alt="">
                        <div>
                            <p class="fa-user-plus" style="font-weight: lighter;">&nbsp;{{item.creator}}</p>
                            <p>{{item.title}}</p>
                            <p>{{item.copywriting}}</p>
                        </div>
                        
                    </div>
                    <div  v-for="item in listMusic" :key="item.id">
                        <strong class="fa-user-plus" style="font-weight: lighter;">&nbsp;{{item.creator}}</strong>
                        <img :src=item.cover alt="">
                        <p><icon class="fa-music"></icon>&nbsp; {{item.title}}</p>
                    </div>
                    
                </div>


            </div>


            <div class="RankingList">
                <h1>热门榜单</h1>
                <div class="item" v-for="item in dataList" :key="item.id">
                    <div class="rank">{{ item.id }}</div>
                    <div class="picture">
                        <img :src=item.url>
                    </div>
                    <div class="author">
                        <span>{{ item.name }}</span><span>&nbsp;- {{ item.author }}</span>
                    </div>
                    <div class="clickNum">
                        点击数：<span>{{ item.clickNum }}</span>
                    </div>
                </div>

            </div>



        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    dataList:any[],
    listMusic:any[]
}>()

//大封面的数据
let firstitem:any=[];
firstitem.push(props.listMusic[0]);
</script>

<style scoped>
#seation {

    width: 100%;
    /* height: 80rem; */
    /* border-top: 5px solid var(--color-theme); */
    background-image: linear-gradient(180deg, #2f6ed3 5%, #5095e4 20%, #5095e4 60%, #2f6ed3 95%);
    position: relative;
}

#seation>div {
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--color-white);
    display: flex;
}


/* 背景圆动画 */
 
@keyframes animate {
    0%, 100%{
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
    min-width: 390px;
    width: 30%;
    /* height: 40rem; */
    /* border: 1px solid; */
    /* border-right: 5px solid var(--color-theme); */
    height: max-content;
    padding: 1rem;
    margin: 3rem;
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
    min-width: 20rem;
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
    min-width: 1rem;
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
    width: 60%;
    min-width: 585px;
    padding: 1rem;
    margin: 3rem;
    margin-right: 1rem;
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
    justify-content:space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-bottom: 4rem;
}
/* 精选歌单的大封面盒子 */
#seation div .musicSheetList .box div:nth-of-type(1){
   width: 95%;
   height:28rem ;
   /* border: 1px solid; */
   display: flex;
   justify-content: center;
   align-items: center;
   /* border-radius: 10px; */
   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    /* 优化高斯模糊 */
    transform: translateZ(0);
    position: relative;
}
/* 精选歌单的大封面 */
#seation div .musicSheetList .box>div:nth-of-type(1)>img{
    width: 50%;
    height: 100%;
    /* background-color: aliceblue; */
    object-fit: cover;
    /* border-radius:10px 0 0 10px;  */
}

/* 精选歌单的简介以及歌单名的盒子*/
#seation div .musicSheetList .box>div:nth-of-type(1)>div{
    width: 50%;
    height: 100%;
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* border-radius:0 10px 10px 0;  */
    cursor: pointer;
}
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(2),
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(3){
    min-width:20rem;
    height: 5rem;
    /* border: 1px solid; */
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 1vw;
    font-size:3vw;
    color: var(--color-white);
    font-weight: 900;
}
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(3){
    height: 3rem;
    font-size:1vw;
}
/* 精选歌单的创建者 */
#seation div .musicSheetList .box>div:nth-of-type(1)>div p:nth-of-type(1){
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
    font-family:FontAwesome ;
}
/* 小歌单 */
#seation div .musicSheetList .box div:nth-of-type(n+2){
    width: auto;
    height: 14rem;
    /* border: 1px solid; */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 4rem;
    position: relative;
    font-family:FontAwesome ;
    cursor: pointer;
}
#seation div .musicSheetList .box div:nth-of-type(n+2) strong{
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    position: absolute;

}
#seation div .musicSheetList .box div:nth-of-type(n+2) img{
   width: auto;
   height: 14rem;
   object-fit: cover;
}
#seation div .musicSheetList .box div:nth-of-type(n+2) p{
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    padding-left:.5rem ;
    font-size: 12px;
    box-shadow: rgba(221, 221, 228, 0.25) 0px 2px 5px -1px, 
    rgba(28, 25, 25, 0.3) 0px 1px 3px -1px;
    color: var(--color-white);
}
</style>