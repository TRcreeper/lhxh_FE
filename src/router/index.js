import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue';

import ActivitManageVue from '@/views/activity/ActivitManage.vue';
import ActivityCategoryVue from '@/views/activity/ActivityCategory.vue';
import MemberListVue from '@/views/member/MemberList.vue';
import UserAvatarVue from '@/views/user/UserAvatar.vue';
import UserInfoVue from '@/views/user/UserInfo.vue';
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue';
import ApplyForVue from '@/views/apply/ApplyFor.vue';
import ApplyListVue from '@/views/apply/ApplyList.vue';
import EquipmentListVue from '@/views/equipment/EquipmentManage.vue'
import BorrowListVue from '@/views/equipment/BorrowManage.vue'

import useUserInfoStore from '@/stores/userInfo';
import { ElMessage } from 'element-plus';
import HomePageVue from '@/views/homepage.vue';
import RecommendationSubmitVue from '@/views/recommendation/RecommendationSubmit.vue';
import RecommendationListVue from '@/views/recommendation/RecommendationList.vue';

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue,redirect:'/homePage', children: [
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
            { path: '/member/list', component: MemberListVue ,meta: { isAuth: true },
            beforeEnter: (to, from, next) => {
                if(to.meta.isAuth){
                     // 在单个路由的独享守卫
                const userInfoStore=useUserInfoStore();
                const userInfo = userInfoStore.info
                if(userInfo.rolelevel>1){
                        next();
                } else {
                    ElMessage.error('您的权限不足')
                    next('/login');
                }
                }
              } 
            },
            { path: '/user/info', component: UserInfoVue },
            // { path: '/user/avater', component: UserAvatarVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue },
            { path: '/apply/applyFor', component: ApplyForVue, meta: { isAuth: true },
            beforeEnter: (to, from, next) => {
                if(to.meta.isAuth){
                     // 在单个路由的独享守卫
                const userInfoStore=useUserInfoStore();
                const userInfo = userInfoStore.info
                if(userInfo.rolelevel<2){
                        next();
                } else {
                    ElMessage.error('您的权限不足')
                    next('/login');
                }
                }
              } 
            },
            { path: '/apply/list', component: ApplyListVue ,meta: { isAuth: true },
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
            {path:'/equipment/list',component: EquipmentListVue,meta: { isAuth: true },
            beforeEnter: (to, from, next) => {
                if(to.meta.isAuth){
                     // 在单个路由的独享守卫
                const userInfoStore=useUserInfoStore();
                const userInfo = userInfoStore.info
                if(userInfo.rolelevel>1){
                        next();
                } else {
                    ElMessage.error('您的权限不足')
                    next('/login');
                }
                }
              } 
            },
            {path:'/borrow/list',component: BorrowListVue,meta: { isAuth: true },
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
            {path:'/homePage',component: HomePageVue},
            {path:'/recommendation/recommendationSubmit',component: RecommendationSubmitVue},
            {path:'/recommendation/recommendationList',component: RecommendationListVue}
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