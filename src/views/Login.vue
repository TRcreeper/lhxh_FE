<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
//导入好看的提示信息
import { ElMessage } from 'element-plus'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: '',
    capturekey: ''
})

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error('请确认两次输入的密码一样'))
    } else {
        callback()
    }
}
//定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//调用后台接口完成注册
import { userRegisterService, userLoginService } from '@/api/user.js'
const register = async () => {
    let result = await userRegisterService(registerData.value);
    // if(result.code===0){
    //     //注册成功
    //     alert(result.msg?result.msg:'注册成功');
    // }else{
    //     //失败
    //     alert('注册失败')
    // }
    // alert(result.msg?result.msg:'注册成功');
    ElMessage.success(result.msg ? result.msg : '注册成功');
}

//登录绑定数据复用注册表单数据
//复用表单校验数据
//登陆函数
import { useTokenStore } from '@/stores/token.js'
import { useRouter } from 'vue-router';
const router = useRouter()
const tokenStore = useTokenStore();
const login = async () => {
    //调用接口，完成登录
    let result = await userLoginService(registerData.value);
    // if(result.code===0){
    //     //成功
    //     alert(result.msg?result.msg:'登录成功');
    // }else{
    //     //失败
    //     alert('登录失败')
    // }
    //alert(result.msg?result.msg:'登录成功');
    ElMessage.success(result.msg ? result.msg : '登录成功');
    //把得到的token存到pinia中
    tokenStore.setToken(result.data)
    await getUserInfo()
    //跳转到首页
    router.push('/')
}

//定义函数用来清空数据
const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: '',
        capturekey:''
    }
}

import globalvar from '@/api/globalvar';

import { captureService } from '@/api/capture';
const fetchCaptcha = async () => {
    try {
        globalvar.globalcapturekey=Math.random()
        let response = await captureService(globalvar.globalcapturekey);
        if (response.data) {
            const blob = new Blob([response.data], { type: 'image/png' });
            let captchaUrl = URL.createObjectURL(blob);
            document.getElementById('captchaImage').src = captchaUrl;
        } else {
            console.error('No data received from captureService');
        }
    } catch (error) {
        console.error('Error fetching captcha:', error);
    }
};
fetchCaptcha()

    // try {
    //     globalvariable.capturekey = Math.random()
    //     // 调用后台接口获取验证码
    //     const response = await axios.get('/api/captcha?key='+globalvariable.capturekey, { responseType: 'arraybuffer' });
    //     const blob = new Blob([response.data], { type: 'image/png' });
    //     const captchaUrl = URL.createObjectURL(blob);

    //     // 使用 captchaUrl 显示图像
    //     document.getElementById('captchaImage').src = captchaUrl;

    //     console.log('验证码获取成功:', captchaUrl);
    // } catch (error) {
    //     console.error('获取验证码失败:', error);
    // }

import { userInfoService } from '@/api/user.js';
import { memberInfoService } from '@/api/member';
import useUserInfoStore from '@/stores/userInfo';
const userInfoStore=useUserInfoStore();
const getUserInfo=async()=>{
    //调用接口
    let result=await userInfoService();
    let memberInfo=await memberInfoService();
    //扩展memberId属性
    result.data.memberId=null
    result.data.rolelevel=1;
    
    if(memberInfo.data===null){
        result.data.rolelevel=1;
        result.data.memberId=null;
    }else if(memberInfo.data.role==='会员'){
        result.data.rolelevel=2;

        result.data.memberId=memberInfo.data.id;
    }else if(memberInfo.data.role==='干事'){
        result.data.rolelevel=3;
        
        result.data.memberId=memberInfo.data.id;
    }else if(memberInfo.data.role==='社长'){
        result.data.rolelevel=4;
        
        result.data.memberId=memberInfo.data.id;
    }
    // console.log(result.data.rolelevel);
    // console.log(result.data.memberId);
    // console.log(memberInfo.data.id);
    
    //数据存储到pinia中
    userInfoStore.setInfo(result.data)
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>

                <!-- 验证码输入框和图片 -->
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-input name="captcha" v-model="registerData.captcha" style="width: 140px" placeholder="验证码" />
                            <!-- <el-input name="captcha" :prefix-icon="CircleCheck" placeholder="验证码"
                                v-model="registerData.captcha"></el-input> -->
                        </el-col>
                        <el-col :span="12">
                            <img id="captchaImage" alt="Captcha Image" :src="captchaUrl" width="100%" height="auto" @click="fetchCaptcha()">
                        </el-col>
                    </el-row>
                </el-form-item>

                <!-- <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item> -->
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo.png') no-repeat center / 350px auto,
            url('@/assets/login_lh.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>