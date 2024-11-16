//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';

//导入好看的提示信息
import { ElMessage } from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
//const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})

import { useTokenStore } from '@/stores/token.js';
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        const tokenStore=useTokenStore();
        //判断是否有token
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token
        }
        return config
    },
    (err)=>{
        //请求错误的回调
        Promise.reject(err)
    }
)

import router from '@/router'

//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if (result.headers['content-type']?.includes('image/png')) {
            return result; // 直接返回图片响应
        }

        // 如果是文件下载
        if (result.headers['content-type']?.includes('application/vnd.ms-excel')) {
            return result;
        }
        //判断业务状态码
        if(result.data.code===0){
            return result.data;
        }
        //操作失败
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        //异步的状态转化成失败的状态
        return Promise.reject(result.data)
    },
    err=>{
        //判断响应状态码，如果为401，则未登录，跳回登陆界面
        if(err.response.status===401){
            ElMessage.error('请先登录')
            router.push('/login')
        }else if(err.response.status===403){
            ElMessage.error('您的权限不足')
            router.push('/login')
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;