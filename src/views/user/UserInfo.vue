<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo';
const userInfoStore=useUserInfoStore();
import { memberInfoService } from '@/api/member';

const userInfo = ref({...userInfoStore.info})
// const memberInfo=(await memberInfoService()).data;

const personalInfo=ref({
    username:'',
    nickname:'',
    name:'',
    email:'',
    // coverImg: '',
    dormitory:''
})

const memberModel = ref({
    id:'',
    name:'',
    email:'',
    dormitory:''
})

const getMemberInfo=async()=>{
    let result=await memberInfoService()
    if(result.data===null){
        personalInfo.value.username=userInfo.value.username
        personalInfo.value.nickname=userInfo.value.nickname
    }
    else
    {
        personalInfo.value.username=userInfo.value.username
        personalInfo.value.nickname=userInfo.value.nickname
        personalInfo.value.name=result.data.name
        personalInfo.value.email=result.data.email
        personalInfo.value.dormitory=result.data.dormitory
    }
}

// const 

getMemberInfo()
// console.log(userInfo.value);



// const personalInfo1 = ref({
//     ...userInfo.value,  // 解构 userInfo 的内容
//     ...memberInfo       // 解构 memberInfo 的内容
// });

console.log(personalInfo.value);
// console.log(personalInfo1.value);
// console.log(memberInfo);



// const memberInfo=ref({
//     name: '',
//     email: '',
//     // coverImg: '',
//     dormitory: ''
// })

const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ]
    ,
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}
//修改个人信息
import { userInfoUpdateService } from '@/api/user';
import { memberUpdateService } from '@/api/member';
import { ElMessage } from 'element-plus';
const updateUserInfo=async()=>{
    userInfo.value.username=personalInfo.value.username
    userInfo.value.nickname=personalInfo.value.nickname
    //调用接口
    let result1=await userInfoUpdateService(userInfo.value)
    // ElMessage.success(result1.msg?result1.msg:'修改成功');

    let member=await memberInfoService();
    let result2=null;

    if(member.data!=null){
        memberModel.value.id=member.data.id
        memberModel.value.name=personalInfo.value.name
        memberModel.value.email=personalInfo.value.email
        memberModel.value.dormitory=personalInfo.value.dormitory

        //调用接口
        result2=await memberUpdateService(memberModel.value)
        // ElMessage.success(result1.msg?result1.msg:'修改成功');
    }

    const successMessage = (result1.msg ? result1.msg : '修改成功') + (result2 ? (result2.msg ? ` ${result2.msg}` : '') : '');
    ElMessage.success(successMessage);

    //修改pinia
    userInfoStore.setInfo(userInfo.value)

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="personalInfo" :rules="rules" label-width="100px" size="large">

                    <el-form-item label="登录名称">
                        <el-input v-model="personalInfo.username" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="personalInfo.nickname"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名" prop="name" v-if="userInfo.rolelevel>1">
                        <el-input v-model="personalInfo.name"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email" v-if="userInfo.rolelevel>1">
                        <el-input v-model="personalInfo.email"></el-input>
                    </el-form-item>

                    <el-form-item label="寝室楼" prop="dormitory" v-if="userInfo.rolelevel>1">
                        <el-input v-model="personalInfo.dormitory"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                    
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>