import request from '@/utils/request.js';

//提供调用发出申请接口
export const participateAddService=(participateData)=>{
    return request.post('/participate/member',participateData)
}

export const participateInfoService=(activityId)=>{
    return request.get('/participate?activityId='+activityId)
}

//会员退出活动
export const participateDeleteService=(activityId)=>{
    return request.delete('/participate/member?activityId='+activityId)
}

export const participateListService=(params)=>{
    return request.get('/participate/list/member',{params:params})
}

export const participateAdminDeleteService=(params)=>{
    return request.delete('/participate/admin/member',{params:params})

}