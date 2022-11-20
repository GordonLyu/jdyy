<template>
    <div id="seation">
        <h1>热门榜单</h1>
        <div class="RankingList">
            <!-- <div class="item">
                <div class="rank">1</div>
                <div class="picture">
                    <img src="@/assets/image/nav1.jpg" alt="">
                </div>
                <div class="author">
                   <span>aaaa</span><span> - cuanzi</span>
                </div>
                <div class="clickNum">
                   点击数：<span>333</span>
                </div>
            </div> -->

            <div class="item"  v-for="item in dataList" :key="item.id">
                <div class="rank">{{item.rank}}</div>
                <div class="picture">
                    <img :src=item.url>
                </div>
                <div class="author">
                   <span>{{item.name}}</span><span> - {{item.author}}</span>
                </div>
                <div class="clickNum">
                   点击数：<span>{{item.clickNum}}</span>
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
    height: 40rem;
    padding: 2rem;
    /* border-top: 5px solid var(--color-theme); */
    background-color: var(--color-white);
}

#seation .RankingList {
    min-width: 360px;
    width: 30%;
    height: 40rem;
    border-right: 5px solid var(--color-theme);
    padding-right:2rem;
}

#seation .RankingList .item {
    min-width: 20rem;
    height:4rem;
    background-color: #f6f6f6;
    margin-top: 20px;
    display: flex;

}
#seation .RankingList .item .rank{
    min-width: 3rem;
    width:10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#seation .RankingList .item .picture{
    min-width: 1rem;
    width:10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
#seation .RankingList .item .picture img{
    width: 100%;
}
#seation .RankingList .item .author{
    width: 40%;
    display: flex;
    align-items: center;
    margin-left: 5%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#seation .RankingList .item .author span:nth-of-type(2){
    font-size: 14px;
    color: gray;
}
#seation .RankingList .item .clickNum{
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5%;
    font-size: .5vw;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#seation .RankingList .item .clickNum span{
    font-size: .9vw;
    font-weight: 900;
    color: red;
}
</style>