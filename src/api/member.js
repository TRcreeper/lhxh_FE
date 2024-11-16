import request from '@/utils/request.js';

//提供调用查询会员信息
export const memberInfoService=()=>{
    return request.get('/member/memberInfo')
}

//查询会员
export const memberListService=(params)=>{
    return request.get('/member',{params:params})
}

// //添加会员
// export const memberAddService=(memberData)=>{
//     return request.post('/member',memberData)
// }

// 添加会员
export const deleteApplyAndAddMemberService = (applyId, memberData) => {
    return request.post(`/member/worker?applyId=${applyId}`, memberData);
}


//会员修改个人信息
export const memberUpdateService=(memberData)=>{
    return request.put('/member',memberData)
}

import instance from '@/utils/request.js';
export const downloadMembersService=async ()=> {
    try {
        const response = await instance.get('/member/export/worker', { responseType: 'blob' });
        
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

//删除会员
export const memberDeleteService=(id)=>{
    return request.delete('/member/president?id='+id)
}


//修改角色
export const memberUpdateRoleService=(roleData)=>{
    return request.patch('/member/president',roleData)
}