

<template>
  <RouterView v-if="state.showRouter"/>
  
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

import { defineComponent, nextTick, provide, reactive} from 'vue'

  export default defineComponent({
  setup() {
    const state = reactive({
      showRouter: true,
    })
    function reload() {
      state.showRouter = false
      nextTick(() => {
        state.showRouter = true
      })
    }
    provide('reload', reload)
    return {
      state,
    }
  },
})



</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Kanit:900);
@import url(https://fonts.googleapis.com/css?family=Long+Cang&display=swap);


:root{
  --color-theme-light:rgb(148, 200, 227);
  --color-theme:#61b4e0;
  --color-white:#fff;
}


</style>
