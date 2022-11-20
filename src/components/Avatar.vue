<template>
  <div class="block">
    <el-avatar :size="45" :src="circleUrl" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
});

const { circleUrl } = toRefs(state);
</script>

<style scoped>

</style>
