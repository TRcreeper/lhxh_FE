//定义store
import { defineStore } from "pinia";
import { ref } from "vue";


//第一个参数：名字唯一性
//第二个参数：函数
//返回值函数
export const useTokenStore = defineStore('token', () => {
    //定义状态内容
    const token = ref('')

    const setToken = (newToken) => {
        token.value = newToken
    }

    const removeToken = () => {
        token.value = ''
    }
    return {
        token, setToken, removeToken
    }
},{
    persist:true//持久化存储
});