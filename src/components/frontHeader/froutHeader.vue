<template>
    <div class="nav">
        <div class="navLeft">
            <div class="logo">
                daodao音乐盒
            </div>
        </div>
        <div class="navRight">
            <button>
                <router-link to="/register">登录</router-link>
            </button>

        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.nav{
    width: 100%;
    height: 6rem;
    border: 1px solid;
    background-color: var(--color-theme);
}

</style>