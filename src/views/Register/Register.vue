<template>
    <div class="Register">
        <card>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="demo-ruleForm">
                <!-- 用户名 -->
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.username" class="w-50 m-3" size="large" placeholder="用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                
                <!-- 昵称 -->
                <!-- <el-form-item prop="nickName">
                    <el-input
                        v-model="ruleForm.nickName"
                        class="w-50 m-3"
                        size="large"
                        placeholder="昵称"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Postcard />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item> -->

                <!-- 邮箱 -->
                <!-- <el-form-item prop="email">
                    <el-input
                        v-model="ruleForm.email"
                        class="w-50 m-3"
                        type="email"
                        size="large"
                        placeholder="邮箱"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Promotion />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item> -->

                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" class="w-50 m-2" size="large" type="password"
                        placeholder="密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 确认密码 -->
                <el-form-item prop="ensurePassword">
                    <el-input v-model="ruleForm.ensurePassword" class="w-50 m-2" size="large" type="password"
                        placeholder="确认密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button color="#1890ff" style="color: white" class="register-button"
                        @click="submitForm(ruleFormRef)">
                        注册
                    </el-button>
                    <p id="signup-hint">
                        注册完成? &nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/login">返回登录</router-link>
                    </p>
                </el-form-item>
            </el-form>
        </card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import card from "@/components/Card/Card.vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { doRegister } from '@/api/register';


const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    username: '',
    password: '',
    ensurePassword: ''
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
    ensurePassword: [{ required: true, message: "确认密码不能为空", trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {


        if (valid) {
            doRegister(JSON.stringify(ruleForm)).then(res => {
                console.log(res, ruleForm);
                if (res.code === 200) {
                    ElMessage.success("注册成功！！！")
                } else if (ruleForm.password !== ruleForm.ensurePassword) {
                    ElMessage.error("第一次与第二次输入的密码不一致")
                    return false;
                } else {
                    ElMessage.error(res.message)
                    return false;
                }
            })


        } else {
            ElMessage.error("输入框信息不能为空")
            return false
        }
    })
}

</script>

<style scoped>
/* 返回按钮 */
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

.Register {
    background-image: url(@/assets/image/login-background.jpg);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 注册按钮 */
.register-button {
    width: 100%;
    height: 40px;
}
</style>