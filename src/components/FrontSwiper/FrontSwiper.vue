<template>
	<swiper
			:modules="modules"
			:loop="true"
			:slides-per-view="1"
			:space-between="0"
			:autoplay="{ delay: 4000, disableOnInteraction: false }"
			navigation
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
		>
	<!-- loop可循环轮播，autoplay可自动播放 -->
			<swiper-slide><img src="https://imgessl.kugou.com/commendpic/20221226/20221226220604107196.jpg" alt=""></swiper-slide>
			<swiper-slide><img src="https://imgessl.kugou.com/commendpic/20221226/20221226220506260097.jpg" alt=""></swiper-slide>
			<swiper-slide><img src="https://imgessl.kugou.com/commendpic/20221226/20221226220416949308.jpg" alt=""></swiper-slide>
		</swiper>

	<div class="top"></div>


</template>

<script setup lang="ts">

// 引入swiper组件
import { Swiper, SwiperSlide } from 'swiper/vue'
// 引入swiper样式（按需导入）
import 'swiper/css'
// import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
// import 'swiper/css/scrollbar'  // 轮播图的滚动条
// 引入swiper核心和所需模块
import { Autoplay, Pagination, Navigation } from 'swiper'
// 在modules加入要使用的模块
const modules = [Autoplay, Pagination, Navigation]

</script>

<style scoped>
#swiper[data-v-ab4b0ba5] {
	position: relative;
	width: 100%;
}

.swiper-slide {
	width: 100%;
	height: 40rem;
	/* border: 1px solid; */
}

.swiper-slide img {
	width: 100%;
	height: 40rem;
	display: block;
	object-fit: cover;
}

.swiper-button-next {
	background-color: var(--color-white) !important;
	right: 0px;
}

.swiper-button-prev {
	background-color: var(--color-white) !important;
	left: 0px;
}
</style>