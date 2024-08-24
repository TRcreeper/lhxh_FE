<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
// const categorys = ref([
//     {
//         "id": 3,
//         "categoryName": "美食",
//         "categoryAlias": "my",
//         "createTime": "2023-09-02 12:06:59",
//         "updateTime": "2023-09-02 12:06:59"
//     },
//     {
//         "id": 4,
//         "categoryName": "娱乐",
//         "categoryAlias": "yl",
//         "createTime": "2023-09-02 12:08:16",
//         "updateTime": "2023-09-02 12:08:16"
//     },
//     {
//         "id": 5,
//         "categoryName": "军事",
//         "categoryAlias": "js",
//         "createTime": "2023-09-02 12:08:33",
//         "updateTime": "2023-09-02 12:08:33"
//     }
// ])

//用户搜索时选中的发布状态
const nickname = ref('')

//文章列表数据模型
const users = ref([
    {
        "id": 5,
        "username": "creep",
        "nickname": "cp",
        "email": "22@qq.com",
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
       "id": 5,
        "username": "creep",
        "nickname": "cp",
        "email": "22@qq.com",
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
       "id": 5,
        "username": "creep",
        "nickname": "cp",
        "email": "22@qq.com",
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    userList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    userList()
}

// //回显文章分类
// import { activityCategoryListService, activityListService,activityAddService,activityUpdateService } from '@/api/activity.js'
// const activityCategoryList = async () => {
//     let result = await activityCategoryListService();
//     categorys.value = result.data;
// }

//获取文章列表数据
import { userListService } from '@/api/user';
const userList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        nickname: nickname.value ? nickname.value : null
    }
    let result = await userListService(params);

    //渲染视图
    total.value = result.data.total;
    users.value = result.data.items;

    //处理数据，给数据模型扩展一个分类名称属性
    // for (let i = 0; i < users.value.length; i++) {
    //     let user = users.value[i];
    //     for (let j = 0; j < users.value.length; j++) {
    //         if (activity.categoryId == categorys.value[j].id) {
    //             activity.categoryName = categorys.value[j].categoryName;
    //         }
    //     }
    // }
}


import { downloadUsersService } from '@/api/user';
const downloadUsers=async()=>{
    await downloadUsersService();

}


import useUserInfoStore from '@/stores/userInfo';
const userInfoStore=useUserInfoStore();
const userInfo = ref({...userInfoStore.info})

// activityCategoryList();
userList();
// import { Plus } from '@element-plus/icons-vue'
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
// import { ElMessage,ElMessageBox } from 'element-plus';
// //控制抽屉是否显示
// const visibleDrawer = ref(false)
// //添加表单数据模型
// const activityModel = ref({
//     title: '',
//     categoryId: '',
//     // coverImg: '',
//     content: '',
//     state: ''
// })

// //添加文章
// const addActivity=async(clickState)=>{
//     activityModel.value.state=clickState;
//     //调用接口
//     let result=await activityAddService(activityModel.value);
//     ElMessage.success(result.msg?result.msg:'添加成功');
//     visibleDrawer.value=false;
//     //刷新列表
//     activityList();
// }

// //定义变量控制标题展示
// const title=ref('')


// //展示编辑弹窗
// const showActivity=(row)=>{
//     visibleDrawer.value=true;title.value='编辑活动'
//     //数据拷贝
//     activityModel.value.title=row.title;
//     activityModel.value.categoryId=row.categoryId;
//     activityModel.value.content=row.content;
//     activityModel.value.state=row.state;
//     //扩展id属性传递给后台
//     activityModel.value.id=row.id
// }

// const updateActivity=async(clickState)=>{
//     activityModel.value.state=clickState;
//     //调用接口
//     let result=await activityUpdateService(activityModel.value);
//     ElMessage.success(result.msg?result.msg:'修改成功');
//     visibleDrawer.value=false;
//     //刷新列表
//     activityList();
// }

// //清空模型数据
// const clearData=()=>{
//     activityModel.value.title='';
//     activityModel.value.categoryId='';
//     activityModel.value.content=' ';
//     activityModel.value.state='';
// }

// import { activityDeleteService } from '@/api/activity.js';
// //删除分类
// const deleteActivity=(row)=>{
//     //提示用户 确认框
//     ElMessageBox.confirm(
//         '你确认要删除该活动信息吗?',
//         '温馨提示',
//         {
//             confirmButtonText: '确认',
//             cancelButtonText: '取消',
//             type: 'warning',
//         }
//     )
//         .then(async () => {
//             //调用接口
//             let result = await activityDeleteService(row.id);
//             ElMessage({
//                 type: 'success',
//                 message: '删除成功',
//             })
//             //刷新列表
//             activityList();
//         })
//         .catch(() => {
//             ElMessage({
//                 type: 'info',
//                 message: '已取消',
//             })
//         })
// }
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>学生管理</span>
                <!-- <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true;title='添加活动';clearData()">添加活动</el-button>
                </div> -->
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="姓名查询：">
                <el-input v-model="nickname" style="width: 240px" placeholder="请输入要查询姓名" />
                <!-- <el-select placeholder="请选择" v-model="categoryId" style="width:200px;">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select> -->
            </el-form-item>

            <!-- <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state" style="width:200px;">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="userList">搜索</el-button>
                <el-button @click="nickname = ''">重置</el-button>
                <el-button v-if="userInfo.role=='管理员'" @click="downloadUsers">下载学生数据</el-button>
            </el-form-item>
        </el-form>
        <!-- 学生列表 -->
        <el-table :data="users" style="width: 100%">
            <el-table-column label="id"  prop="id"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="姓名" prop="nickname"></el-table-column>
            <el-table-column label="邮箱" width="400" prop="email"> </el-table-column>
            <!-- <el-table-column label="状态" prop="state"></el-table-column> -->
            <!-- <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showActivity(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteActivity(row)"></el-button>
                </template>
            </el-table-column> -->
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />


        <!-- 抽屉 -->

        <!-- <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
            <el-form :model="activityModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="activityModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="activityModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">
                    <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false">
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章内容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="activityModel.content" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title=='添加活动'?addActivity('已发布'):updateActivity('已发布')">发布</el-button>
                    <el-button type="info" @click="title=='添加活动'?addActivity('草稿'):updateActivity('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer> -->

    </el-card>
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>