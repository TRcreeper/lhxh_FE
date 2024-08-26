import request from '@/utils/request.js';

//提供调用查询会员信息
export const memberInfoService=()=>{
    return request.get('/member/memberInfo')
}

//查询会员
export const memberListService=(params)=>{
    return request.get('/member',{params:params})
}