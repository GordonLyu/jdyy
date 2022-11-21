<template>
    <div class="nav">
        <div class="navLeft">
            <div class="logo">
                LG
            </div>

        </div>
        <div class="navRight">
            <span style="margin-left: .5rem;">cuanzi</span>
            <span> | </span>
            <button>
                <router-link to="/login">登录</router-link>
            </button>

        </div>
        <div class="view"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* 页面头部 */
.nav {
    width: 100%;
    height: 6rem;
    position: relative;
    /* border: 1px solid; */
    /* background-color: var(--color-theme); */
    background-image: linear-gradient(180deg, #2f6ed3 0%, #5095e4 0%, #5095e4 0%, #2f6ed3 95%);
    display: flex;
    justify-content: space-between;
    box-shadow: 0 -5px 1px rgb(255, 255, 255) inset;
}

.view {
    content: '';
    position: absolute;
    top: 6rem;
    display: block;
    width: 100%;
    height: 6rem;
    z-index: 9;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
}

.nav .navLeft {
    border-right: 5px solid var(--color-white);
}

.nav .navLeft,
.nav .navRight {
    width: 30%;
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 登录按钮 */
.nav .navRight button {
    width: 5rem;
    height: 3rem;
    margin-right: .5rem;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}
.nav .navRight a{
    color: var(--color-white);
}
.nav .navRight button:hover {
    animation: btn .6s linear;
}

@keyframes btn {
    from {
        transform: rotate(-10deg);
        letter-spacing: .3rem;
    }

    to {
        transform: rotate(0deg);
        letter-spacing: .3rem;
    }
}

/* 登录按钮内的文字 */
.navRight button a {
    width: 100%;
    height: 100%;
    color: var(--color-theme);
    font-size: 1rem;
    text-decoration: none;
}

/* logo */
.nav .navLeft .logo {
    font-size: 2.7rem;
    color: var(--color-white);
    text-shadow: 0px -1px 3.5px;
}


.navRight span {
    color: var(--color-white);

}

/* .navRight span:nth-of-type(1) {
    font-size: 1.3rem;
    text-shadow: 0px -1px 2px;
} */

/* 用户名 */
.navRight span:nth-of-type(1) {
    display: inline-block;
    border-bottom: 2px solid;
    font-weight: 900;
    cursor: pointer;
    /* text-shadow: 0px -1px 2px; */
}

/* 用户名和登录按钮之间的“ | ” */
.navRight span:nth-of-type(2) {
    margin: 0 .5rem;
    font-size: 1.7rem;
}
</style>