<template>
    <div id="seation">
        <!-- 背景图 -->
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="">
        <img src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg" alt="">

        <div>
            <div class="musicSheetList">
                <h1>精选歌单</h1>
                <div class="box">
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                    <div>
                        <img src="@/assets/image/nav2.jpg" alt="">
                        <p>ddddddddddddddddddddddddddd</p>
                    </div>
                </div>


            </div>


            <div class="RankingList">
                <h1>热门榜单</h1>
                <div class="item" v-for="item in dataList" :key="item.id">
                    <div class="rank">{{ item.rank }}</div>
                    <div class="picture">
                        <img :src=item.url>
                    </div>
                    <div class="author">
                        <span>{{ item.name }}</span><span> - {{ item.author }}</span>
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
defineProps<{
    dataList: any[]
}>()
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

#seation>img {
    position: absolute;
}

#seation>img:nth-of-type(1) {
    width: 15%;
    /* top: -30%; */
    left: 50%;

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
    left: 60%;

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
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
    justify-content:center;
    flex-wrap: wrap;
    margin-top: 20px;
}
/* 精选歌单的大封面盒子 */
#seation div .musicSheetList .box div:nth-of-type(1){
   width: 95%;
   height:28rem ;
   border: 1px solid;
   display: flex;
   justify-content: center;
   align-items: center;
}
/* 精选歌单的大封面 */
#seation div .musicSheetList .box div:nth-of-type(1) img{
    width: 28rem;
}
#seation div .musicSheetList .box div:nth-of-type(1) p{
    width: 90%;
    text-align: left;
}
#seation div .musicSheetList .box div:nth-of-type(n+2){
    width: auto;
    height: 14rem;
    border: 1px solid;
}
#seation div .musicSheetList .box div:nth-of-type(n+2) img{
   width: auto;
   height: 14rem;
}
</style>