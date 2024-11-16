//导入request.js请求工具
import request from'@/utils/request.js'

//修改
export const informationUpdateService=(informationData)=>{
    return request.put('/information/worker',informationData)
}

export const informationService=()=>{
    return request.get('/information')
}