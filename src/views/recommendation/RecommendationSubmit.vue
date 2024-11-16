<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo';
const userInfoStore = useUserInfoStore();
import { memberInfoService } from '@/api/member';

const userInfo = ref({ ...userInfoStore.info })
// const memberInfo=(await memberInfoService()).data;

const recommendationModel = ref({
    title: '',
    content: ''
})

const memberModel = ref({
    id: '',
    name: '',
    email: '',
    dormitory: ''
})

import { ElMessage } from 'element-plus';
import { recommendationAddService } from '@/api/recommendation';
const addRecommendation = async () => {

    //调用接口
    let result = await recommendationAddService(recommendationModel.value)
    ElMessage.success(result.message ? result.message : '修改成功');

    //清空模型
    recommendationModel.value.content=' ';
    recommendationModel.value.title='';

    // let member = await memberInfoService();
    // let result2 = null;

    // if (member.data != null) {
    //     memberModel.value.id = member.data.id
    //     memberModel.value.name = personalInfo.value.name
    //     memberModel.value.email = personalInfo.value.email
    //     memberModel.value.dormitory = personalInfo.value.dormitory

    //     //调用接口
    //     result2 = await memberUpdateService(memberModel.value)
    //     // ElMessage.success(result1.msg?result1.msg:'修改成功');
    // }

    // const successMessage = (result1.msg ? result1.msg : '修改成功') + (result2 ? (result2.msg ? ` ${result2.msg}` : '') : '');
    // ElMessage.success(successMessage);

    // //修改pinia
    // userInfoStore.setInfo(userInfo.value)

}

// const getMemberInfo = async () => {
//     let result = await memberInfoService()
//     if (result.data === null) {
//         personalInfo.value.username = userInfo.value.username
//         personalInfo.value.nickname = userInfo.value.nickname
//     }
//     else {
//         personalInfo.value.username = userInfo.value.username
//         personalInfo.value.nickname = userInfo.value.nickname
//         personalInfo.value.name = result.data.name
//         personalInfo.value.email = result.data.email
//         personalInfo.value.dormitory = result.data.dormitory
//     }
// }

// const 

// getMemberInfo()
// console.log(userInfo.value);



// const personalInfo1 = ref({
//     ...userInfo.value,  // 解构 userInfo 的内容
//     ...memberInfo       // 解构 memberInfo 的内容
// });

// console.log(personalInfo.value);
// console.log(personalInfo1.value);
// console.log(memberInfo);



// const memberInfo=ref({
//     name: '',
//     email: '',
//     // coverImg: '',
//     dormitory: ''
// })

// const rules = {
//     nickname: [
//         { required: true, message: '请输入用户昵称', trigger: 'blur' },
//         {
//             pattern: /^\S{2,10}$/,
//             message: '昵称必须是2-10位的非空字符串',
//             trigger: 'blur'
//         }
//     ]
//     ,
//     email: [
//         { required: true, message: '请输入用户邮箱', trigger: 'blur' },
//         { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
//     ]
// }
// //修改个人信息
// import { userInfoUpdateService } from '@/api/user';
// import { memberUpdateService } from '@/api/member';
// import { ElMessage } from 'element-plus';
// const updateUserInfo = async () => {
//     userInfo.value.username = personalInfo.value.username
//     userInfo.value.nickname = personalInfo.value.nickname
//     //调用接口
//     let result1 = await userInfoUpdateService(userInfo.value)
//     // ElMessage.success(result1.msg?result1.msg:'修改成功');

//     let member = await memberInfoService();
//     let result2 = null;

//     if (member.data != null) {
//         memberModel.value.id = member.data.id
//         memberModel.value.name = personalInfo.value.name
//         memberModel.value.email = personalInfo.value.email
//         memberModel.value.dormitory = personalInfo.value.dormitory

//         //调用接口
//         result2 = await memberUpdateService(memberModel.value)
//         // ElMessage.success(result1.msg?result1.msg:'修改成功');
//     }

//     const successMessage = (result1.msg ? result1.msg : '修改成功') + (result2 ? (result2.msg ? ` ${result2.msg}` : '') : '');
//     ElMessage.success(successMessage);

//     //修改pinia
//     userInfoStore.setInfo(userInfo.value)

// }

import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>建议邮箱</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="recommendationModel" :rules="rules" label-width="100px" size="large">

                    <el-form-item label="建议标题">
                        <el-input v-model="recommendationModel.title" placeholder="请输入标题"></el-input>
                    </el-form-item>



                    <el-form-item label="建议内容">
                        <div class="editor">
                            <quill-editor theme="snow" v-model:content="recommendationModel.content" contentType="html">
                            </quill-editor>
                        </div>
                    </el-form-item>

                    <!-- <el-divider /> -->

                    <el-form-item>
                        <el-button type="primary" @click="addRecommendation">提交建议</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.editor {
    width: 100%; /* 或指定具体宽度，如 600px */
    height: 200px; /* 或指定具体高度，如 400px */
    margin-bottom: 50px; /* 自定义下边距 */
}

</style>