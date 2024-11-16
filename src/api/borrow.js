import request from '@/utils/request.js';

//借用设备
export const borrowAddService=(borrowData)=>{
    return request.post('/borrow/member',borrowData)
}

//借用列表查询
export const borrowListService=(params)=>{
    return request.get('/borrow/member',{params:params})
}

export const returnEquipmentService=(borrowData)=>{
    return request.put('/borrow/member',borrowData)
}