import request from '@/utils/request.js';

// 验证码接口
export const captureService = (key) => {
    return request.get('/captcha', {
        params: { key },
        responseType: 'arraybuffer', // 确保响应以二进制数据形式处理
        headers: { 
            'Accept': 'image/png' // 指定客户端期望的内容类型（如果需要）
        }
    });
};

