import request from '@/utils/request.js';

export const recommendationAddService=(recommendationData)=>{
    return request.post('/recommendation',recommendationData)

}

export const recommendationListService=(params)=>{
    // const tokenStore=useTokenStore();
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/recommendation/worker',{params:params})
}

//删除
export const recommendationDeleteService=(id)=>{
    return request.delete('/recommendation/worker?id='+id)
}