import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue';

import ActivitManageVue from '@/views/activity/ActivitManage.vue';
import ActivityCategoryVue from '@/views/activity/ActivityCategory.vue';
import UserListVue from '@/views/user/MemberList.vue';
import UserAvatarVue from '@/views/user/UserAvatar.vue';
import UserInfoVue from '@/views/user/UserInfo.vue';
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue';

import useUserInfoStore from '@/stores/userInfo';
import { ElMessage } from 'element-plus';

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue,redirect:'/user/info', children: [
            { path: '/activity/category', component: ActivityCategoryVue,meta: { isAuth: true },
                beforeEnter: (to, from, next) => {
                    if(to.meta.isAuth){
                         // 在单个路由的独享守卫
                    const userInfoStore=useUserInfoStore();
                    const userInfo = userInfoStore.info
                    if(userInfo.rolelevel>2){
                            next();
                    } else {
                        ElMessage.error('您的权限不足')
                        next('/login');
                    }
                    }
                  } 
             },
            { path: '/activity/manage', component: ActivitManageVue,},
            { path: '/user/list', component: UserListVue },
            { path: '/user/info', component: UserInfoVue },
            // { path: '/user/avater', component: UserAvatarVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue }
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


// router.beforeEach((to, from, next) => {
//     console.log(to) // 到哪个页面去？
//     console.log(from) // 从哪个页面来？
//     next() // 一个回调函数
//   }
// )

//导出路由
export default router