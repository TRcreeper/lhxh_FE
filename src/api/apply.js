import request from '@/utils/request.js';

//提供调用发出申请接口
export const applyForService=(applyData)=>{
    return request.post('/apply',applyData)
}

//获取用户详细信息
export const applyInfoService=()=>{
    return request.get('/apply')
}

export const applyListService=(params)=>{
    return request.get('/apply/list/worker',{params:params})
}

//删除申请
export const applyDeleteService=(id)=>{
    return request.delete('/apply?id='+id)
}