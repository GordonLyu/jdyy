<template>
    <p @click="visible = true">评论</p>
  
    <el-drawer v-model="visible" :show-close="false" direction="btt" :size="500">
    <template #header="{close}">
      <h1 style="border-bottom:2px solid; padding-bottom: 1rem;">评论</h1>
      <el-button type="danger" @click="close" style="position: absolute; right: 1rem;top: 1.5rem;">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        关闭
      </el-button>
    </template>
    <div class="w">
      亲爱的 ，- {{user}} - 用户你好！！！

    <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
          style="margin-top: 1rem;"
    >
      <el-form-item prop="content" >
      <el-input v-model="ruleForm.content" 
                type="textarea" 
                minlength="6"
                maxlength="255"
                rows="8"
                show-word-limit
                resize="none"
                placeholder="留下你友善的足迹！！！"/>
      </el-form-item>

      <el-form-item style="float: right;">
        <el-button type="success" plain label-position="right" @click="submitForm(ruleFormRef)">
         发送
        </el-button>

        <el-button type="info" plain label-position="right" @click="resetForm(ruleFormRef)">
          清除
        </el-button>
      </el-form-item>

    </el-form>

    <h1 style="margin:0rem 0 1rem 0;clear: both;"></h1>

    <div class="remarkAll">

      <div v-for="item in remarkData">
        <div class="message">
          <div class="msg">
            <span>{{item.username}}</span>
            <span>{{item.remarkTime}}</span>
          </div>  
          <span>{{item.content}}</span>
        </div>
        

        <div class="clickNum">
          <icon class="fa-thumbs-up"></icon>
          <span>{{item.goodNum}}</span>
          <icon class="fa-trash" @click="removeRemark(item.id)" v-if="item.username==user"></icon>
          <icon class="fa-trash" v-else style="opacity: 0; cursor: default;"></icon>
        </div>

      </div>

      




    </div>



  </div>
    
    
  </el-drawer>
</template>
  
<script lang="ts" setup>
  import { ref,reactive } from 'vue'
  import { ElButton, ElDrawer,ElMessage } from 'element-plus'
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  // import request from "@/utils/requests";
  import { useUserInfoStore } from '@/stores/user-info'

  import type { FormInstance, FormRules } from 'element-plus'
  import { useRoute } from "vue-router"
  import { getByMusic,deleteRemark,add } from '@/api/request/remark';

  //获取当前音乐的id
  const route = useRoute()
  console.log(route.params.id);

  const formSize = ref('large')
  //当前用户名
  const user = useUserInfoStore().username
  
  //当前用户id
  const userId = useUserInfoStore().uid
   //评论区的显示与隐藏
   const visible = ref(false) 
  //当前音乐的评论数据
  const remarkData:any=ref([])

  
  const ruleFormRef = ref<FormInstance>()
  //表单内容
  const ruleForm = reactive({
    content:'',
    uid:userId,
    username:user, 
    mid:route.params.id
  })
  //规则提示
  const rules = reactive<FormRules>({
    content: [
      { required: true, message: '内容不能为空', trigger: 'blur' },
    ],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl ) return
    else if(ruleForm.content.length<=6){
     return ElMessage.error("字数少于7位！！！")
      
    }
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log(ruleForm);
        addRemark(ruleForm);
        ruleForm.content=''
      } else {
        console.log('错误发送', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

 
  //1秒时间查询加载
  setTimeout(()=>{
      getRemarkByMusicId();
  },1000)

//添加评论
function addRemark(data:any){
  add(data).then((res:any) => {
    if (res.code == 200) {
      ElMessage.success({
        message: res.message,
        grouping: true,
      })
      getRemarkByMusicId();


    console.log("添加成功！",res);
    }
    
  });  
}
//删除评论
function removeRemark(id:any){
  deleteRemark(id).then((res:any) => {
    if (res.code == 200) {
      ElMessage.success({
        message: res.message,
        grouping: true,
      })
      getRemarkByMusicId();


    console.log("删除成功！",res);
    }
    
  });  
}

  //根据音乐id获取评论
async function getRemarkByMusicId(){
   await getByMusic(route.params.id).then((res:any) => {
    if (res.code == 200) {
      remarkData.value=res.data
    console.log("查询成功！",remarkData.value);
    }
  });
  }

 
  
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  /* 评论按钮 */
    p{
      width: 3rem;
      height: 2rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 1%;
      right:1%;
      z-index: 1;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(0px);
      /*-webkit-backdrop-filter: blur(1px); */
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      /* 优化高斯模糊 */
      transform: translateZ(0);
      }
      .w{
        width: 100%;
        height: 1000px;
        /* border: 1px solid; */
      }
      /* 输入框 */
      #inputText{
        width: 100%;
        padding: 1rem;
        resize: none;
        margin-top: 1rem;
      }
      .remarkAll{
        width:100%;
        height: max-content;
        /* border: 1px solid; */
      }
      .remarkAll>div{
        width: 100%;
        height: max-content;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: .4rem;
        border-bottom: 1px solid;
        margin-top: .5rem;
      }
      .remarkAll>div>.message{
        width: 90%;
        /* border: 1px solid; */
      }
      .remarkAll>div>.message>span{
        display: inline-block;
        max-width: 80%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
         word-wrap:break-word;/*自动换行 */
        /* border: 1px solid; */
        margin: .7rem 0;
        font-weight: lighter;
        font-size: 15px;
      }
      .msg{
        width: 80%;
        height: 100%;
        /* border: 1px solid; */
        display: flex;
        color: rgb(160, 160, 160);
      }
      .msg span{
        font-size: 13px;
      }
      .msg span:nth-of-type(1){
        margin-right: 1rem;
      }

      /* 点赞数 */
      .remarkAll>div>.clickNum{
        display: flex;
        align-items: center;
        font-family: FontAwesome;
      }
      .remarkAll>div>.clickNum>icon{
        cursor: pointer;
      }
      .remarkAll>div>.clickNum>span{
        font-size: 12px;
        color:rgb(160, 160, 160) ;
        margin-left: .1rem;
      }
      .remarkAll>div>.clickNum>icon:nth-of-type(2){
        margin-left: 1rem;
      }
</style>