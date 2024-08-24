//导入request.js请求工具
import request from'@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
//文章分类列表查询
export const activityCategoryListService=()=>{
    // const tokenStore=useTokenStore();
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

//文章分类添加
export const activityCategoryAddService=(categoryData)=>{
    return request.post('/category/admin',categoryData)
}

//文章分类修改
export const activityCategoryUpdateService=(categoryData)=>{
    return request.put('/category/admin',categoryData)
}

//文章分类删除
export const activityCategoryDeleteService=(id)=>{
    return request.delete('/category/admin?id='+id)
}

//文章列表查询
export const activityListService=(params)=>{
    return request.get('/activity',{params:params})
}

//活动添加
export const activityAddService=(activityData)=>{
    return request.post('/activity/admin',activityData);
}

//活动修改
export const activityUpdateService=(activityData)=>{
    return request.put('/activity/admin',activityData)
}

//删除活动
export const activityDeleteService=(id)=>{
    return request.delete('/activity/admin?id='+id)
}