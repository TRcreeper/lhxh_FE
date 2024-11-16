import request from '@/utils/request.js';

export const equipmentListService=(params)=>{
    return request.get('/equipment/member',{params:params})
}

export const equipmentAddService=(equipmentData)=>{
    return request.post('/equipment/member',equipmentData)
}

//更新设备
export const equipmentUpdateService=(equipmentData)=>{
    return request.put('/equipment/member',equipmentData)

}

export const equipmentDeleteService=(id)=>{
    return request.delete('/equipment/member?id='+id)
}