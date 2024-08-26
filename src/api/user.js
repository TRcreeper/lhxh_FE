//导入request.js请求工具
import request from'@/utils/request.js'

//提供调用注册接口函数
export const userRegisterService=(registerDate)=>{
    //借助于UrlSearchParams完成传递
    const params=new URLSearchParams()
    for(let key in registerDate){
        params.append(key,registerDate[key]);
    }
    return request.post('/user/register',params)
}

import globalcapturekey from './globalvar';
//提供调用登录接口的函数
export const userLoginService=(loginData)=>{
    const params=new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/user/login?key='+globalcapturekey.globalcapturekey,params)
}

//获取用户详细信息
export const userInfoService=()=>{
    return request.get('/user/userInfo')
}

//修改个人信息
export const userInfoUpdateService=(userInfoDate)=>{
    return request.put('/user/update',userInfoDate)
}

//查询学生
export const userListService=(params)=>{
    return request.get('/user',{params:params})
}



import instance from '@/utils/request.js';
export const downloadUsersService=async ()=> {
    try {
        const response = await instance.get('/user/export/worker', { responseType: 'blob' });
        
        // 处理文件下载
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'students.xlsx'); // 可以根据实际情况调整文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('下载失败:', error);
        // 处理错误
    }
}