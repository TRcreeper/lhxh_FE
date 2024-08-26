<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

import { userInfoService } from '@/api/user';
import useUserInfoStore from '@/stores/userInfo.js';
import { useTokenStore } from '@/stores/token';
const tokenStore=useTokenStore();
const userInfoStore=useUserInfoStore();
//调用函数获取详细信息
const getUserInfo=async()=>{
    //调用接口
    let result=await userInfoService();
    let memberInfo=await memberInfoService();
    result.data.rolelevel=1;
    if(memberInfo.data===null){
        result.data.rolelevel=1;
    }else if(memberInfo.data.role==='会员'){
        result.data.rolelevel=2;
    }else if(memberInfo.data.role==='干事'){
        result.data.rolelevel=3;
    }else if(memberInfo.data.role==='社长'){
        result.data.rolelevel=4;
    }
    console.log(result.data.rolelevel);
    
    //数据存储到pinia中
    userInfoStore.setInfo(result.data)
}

getUserInfo();

//条目被点击后调用函数
import {useRouter} from 'vue-router';
const router=useRouter();
import { ElMessage,ElMessageBox } from 'element-plus';
const handleCommand=(command)=>{
    //判断指令
    if(command==='logout'){
        //退出登录
        //提示用户 确认框
    ElMessageBox.confirm(
        '你确认要退出登录吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //退出登录
            //清空pinia
            tokenStore.removeToken()
            userInfoStore.removeInfo()
            //跳转登录
            router.push('/login')
            ElMessage({
                type: 'success',
                message: '退出登录成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
    }else{
        //路由
        router.push('/user/'+command)
    }
}
import { ref } from 'vue';
import { memberInfoService } from '@/api/member';
const userInfo = ref({...userInfoStore.info})
</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item v-if="userInfo.rolelevel>2" index="/activity/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/activity/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-menu-item index="/user/list">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>学生列表</span>
                </el-menu-item>
                <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/user/avater">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item> -->
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>lhxh管理系统</div>
                <!-- <div>黑马程序员：<strong>东哥</strong></div> -->
                 
                <!-- 下拉菜单 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <div>你好：<strong>{{ userInfoStore.info.nickname }}</strong></div>
                        <!-- <el-avatar :src="avatar" /> -->
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <!-- <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item> -->
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>轮滑协会 by creep</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>