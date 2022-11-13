<template>
    <div class="Login">
        <card title="登录">
            <form action="" method="post">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0"
                    class="demo-ruleForm">
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" class="w-50 m-3" size="large" placeholder="用户名">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" class="w-50 m-2" size="large" type="password"
                            placeholder="密码">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <!-- 记住我 -->
                <el-form-item prop="type">
                    <el-checkbox label="记住密码" name="type"></el-checkbox>
                </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                    <p id="signup-hint">
                        还没有账号？
                        <router-link to="/register">快来注册一个吧！</router-link>
                    </p>
                </el-form>
            </form>
        </card>


    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import card from "@/components/card/card.vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { doLogin } from '@/api/login';
import qs from "qs";
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    username: '',
    password: '',
})

const rules = reactive({
    username: [
        {
            required: true,
            message: "用户名不能为空",
            trigger: 'blur'
        }

    ],
    password: [{ required: true, message: "密码不能为空", trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log(ruleForm);
            
           doLogin(qs.stringify(ruleForm)).then(res=>{
            console.log(res.code);
            if(res.code===200){
                ElMessage.success("登录成功")
            }else if(res.code===404){
                ElMessage.error("用户不存在")
            }else{
                ElMessage.error("登录失败")
            }
           })
        } else {
            ElMessage.error("用户名和密码不能为空")
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// function sendData() :void{
//          let that: object=this;
//           this.$axios({
//             method:'get',
//             url:'http://127.0.0.1:8000/v3baiuserlogin/',
//             params:{
//              userName:this.userName,  //2.1需要给后端传的俩参数
//              pwd:this.pwd
//             }
//             }).then(function(data){
//                that.returnarr=data.data  //3.returnarr接收后端返回的参数
//                that.judgedata()    //4.接受完参数就可以在这判断成功与否
//             });
//         }
</script>

<style scoped>
#signup-hint {
    font-size: 14px;
}

#signup-hint a {
    font-size: 14px;
    color: #1890ff;
    text-decoration: none;
}

#signup-hint a:hover {
    text-decoration: underline;
}

.Login {
    background-image: url(@/assets/image/login-background.jpg);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>