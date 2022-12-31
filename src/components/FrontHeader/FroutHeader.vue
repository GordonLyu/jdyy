<template>
    <div class="nav">
        <div class="navLeft">
            <div class="logo">
                LG
            </div>

        </div>
        <div class="navRight">
            <el-dropdown v-if="!loginButton">
                <span class="el-dropdown-link">
                  欢迎您，<span>{{username}}</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="dialogFormVisible = true">添加歌单</el-dropdown-item>
                        <el-dropdown-item divided>个人信息</el-dropdown-item>
                        <el-dropdown-item divided @click="signout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span> -->
            <button v-if="loginButton">
                <router-link to="/login">登录</router-link>
            </button>

        </div>
        <div class="view"></div>
    </div>

    

    <!-- 添加歌单的弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="添加歌单">

        <AddList :sendMitt="sendMitt"></AddList>
      
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
import AddList from '@/views/Fronts/Add/AddList.vue'


import { useUserInfoStore } from '@/stores/user-info'
import { removeToken } from '@/utils/token/index'
import emitter from '@/utils/bus/bus'



//发送信息给兄弟frontSeation组件
const sendMitt = () => {
    emitter.emit('addEvent', true);
}


//是否显示弹出框响应式值
const dialogFormVisible = ref(false)



const username = useUserInfoStore().username

const loginButton = ref(username=='未登录')

    // ↓登出
    const signout = () => {
      // ↓将store重置为初始值
      useUserInfoStore().$reset()
      // ↓删除token
      removeToken()
      // ↓用router.push或replace会缓存页面，比如由admin切换到普通用户，普通用户在没刷新页面之前仍能看到admin才有权限的页面
      window.location.href = '/'
      // router.push('/login')
    }


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
    width: 40%;
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid; */
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

.nav .navRight a {
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
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

/* .navRight span:nth-of-type(1) {
    display: inline-block;
    border-bottom: 2px solid;
    font-weight: 900;
    cursor: pointer;
    text-shadow: 0px -1px 2px;
} */

/* 用户名和登录按钮之间的“ | ” */
.navRight span:nth-of-type(2) {
    margin: 0 .5rem;
    font-size: 1.7rem;
}
</style>