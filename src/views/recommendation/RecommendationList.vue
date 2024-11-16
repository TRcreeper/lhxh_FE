<script setup>
import {
    Edit,
    Delete,
    Pointer
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//用户搜索时选中的发布状态
const state = ref('')

//文章列表数据模型
const recommendations = ref([
    {
        "id": 5,
        "title": "轮滑",
        "content": "今日正常常规",
        "createTime": "2024-09-03 11:55:30",
        "createUser": "未开始"
    },
    {
        "id": 5,
        "title": "轮滑",
        "content": "今日正常常规",
        "createTime": "2024-09-03 11:55:30",
        "createUser": "未开始"
    },
    {
        "id": 5,
        "title": "轮滑",
        "content": "今日正常常规",
        "createTime": "2024-09-03 11:55:30",
        "createUser": "未开始"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    recommendationList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    recommendationList()
}

//回显活动分类
// import { activityCategoryListService, activityListService, activityAddService, activityUpdateService, activityDraftListService } from '@/api/activity.js'

import { recommendationListService } from '@/api/recommendation';
//获取活动列表数据
const recommendationList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    }
    let result = null

    result = await recommendationListService(params)

    //渲染视图
    total.value = result.data.total;
    recommendations.value = result.data.items;


}

// activityCategoryList();
recommendationList();

import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage, ElMessageBox } from 'element-plus';
//控制抽屉是否显示
const visibleDrawer = ref(false)
// const visibleDrawer2 = ref(false)
//添加表单数据模型
const recommendationModel = ref({
    id: '',
    title: '',
    content: '',
    createTime: '',
    createUser: ''
})

// //添加文章
// const addActivity = async (clickState) => {
//     activityModel.value.state = clickState;
//     //调用接口
//     let result = await activityAddService(activityModel.value);
//     ElMessage.success(result.msg ? result.msg : '添加成功');
//     visibleDrawer.value = false;
//     //刷新列表
//     activityList();
// }

// //定义变量控制标题展示
// const title = ref('')


// //展示编辑弹窗
// const showActivity = (row) => {
//     visibleDrawer.value = true; title.value = '编辑活动'

//     //数据拷贝
//     activityModel.value.title = row.title;
//     activityModel.value.categoryId = row.categoryId;
//     activityModel.value.content = row.content;
//     activityModel.value.state = row.state;
//     // activityModel.value.startTime=row.startTime;

//     // LocalDateTime 字符串（假设为东八区时间）
//     const localDateTimeString = row.startTime;

//     // 替换空格为 'T'，以符合 ISO 8601 格式
//     const isoDateTimeString = localDateTimeString.replace(' ', 'T') + '+08:00';

//     // 创建一个 JavaScript Date 对象
//     const localDateTime = new Date(isoDateTimeString);

//     // 转换为 UTC 时间字符串
//     const utcString = localDateTime.toISOString();

//     console.log("UTC Time:", utcString);
//     activityModel.value.startTime = utcString;

//     activityModel.value.progressState = row.progressState;

//     //扩展id属性传递给后台
//     activityModel.value.id = row.id
// }



// const updateActivity = async (clickState) => {
//     activityModel.value.state = clickState;
//     //调用接口
//     let result = await activityUpdateService(activityModel.value);
//     ElMessage.success(result.msg ? result.msg : '修改成功');
//     visibleDrawer.value = false;
//     //刷新列表
//     activityList();
// }

//清空模型数据
const clearData = () => {
    activityModel.value.title = '';
    activityModel.value.categoryId = '';
    activityModel.value.content = ' ';
    activityModel.value.state = '';
    activityModel.value.startTime = '';
    activityModel.value.progressState = '';
}

import { activityDeleteService } from '@/api/activity.js';

import { recommendationDeleteService } from '@/api/recommendation';
//删除分类
// const deleteActivity = async () => {
//     let result = await recommendationDeleteService(recommendaModel.value.id);
//     console.log(result.data);
    

// }

const deleteActivity = (row) => {
    //提示用户 确认框
    ElMessageBox.confirm(
        '你确认要删除该建议信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await recommendationDeleteService(recommendaModel.value.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            recommendationList();
        })
        .catch(() => {
            
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
}

import useUserInfoStore from '@/stores/userInfo';
const userInfoStore = useUserInfoStore();
const userInfo = ref({ ...userInfoStore.info })


// import { participateAddService, participateInfoService, participateDeleteService } from '@/api/participate';
// const participateOrWithdraw = ref("参加活动")

const recommendaModel = ref({
    id: '',
    title: '',
    content: '',
    createTime: '',
    createUser: ''
})
const showRecommendation = async (row) => {

    //数据拷贝
    recommendaModel.value.id = row.id;
    recommendaModel.value.title = row.title;
    recommendaModel.value.content = row.content;
    recommendaModel.value.createTime = row.createTime;
    recommendaModel.value.createUser = row.createUser;

    visibleDrawer.value = true;
}







// const adminDeleteParticipate = async (row) => {
//     let params = {
//         activityId: row.activityId,
//         memberId: row.memberId
//     }

//     //提示用户 确认框
//     ElMessageBox.confirm(
//         '你确认要使此会员退出活动吗?',
//         '温馨提示',
//         {
//             confirmButtonText: '确认',
//             cancelButtonText: '取消',
//             type: 'warning',
//         }
//     )
//         .then(async () => {
//             //调用接口
//             let result = await participateAdminDeleteService(params)
//             addOrDelete()
//             ElMessage.success(result.msg ? result.msg : '已为此会员退出活动')
//             participateList()
//             //刷新列表
//             participateList()
//         })
//         .catch(() => {
//             ElMessage({
//                 type: 'info',
//                 message: '已取消',
//             })
//         })


// }

// const value1 = ref('')
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>建议管理</span>
                <!-- <div class="extra">
                    <el-button type="primary" v-if="userInfo.rolelevel > 2"
                        @click="visibleDrawer = true; title = '添加活动'; clearData()">添加活动</el-button>
                </div> -->
            </div>
        </template>
        <!-- 搜索表单 -->
        <!-- <el-form inline v-if="userInfo.rolelevel > 1">
            <el-form-item label="活动分类：">
                <el-select placeholder="请选择" v-model="categoryId" style="width:200px;">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state" style="width:200px;">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="activityList">搜索</el-button>
                <el-button @click="categoryId = ''; state = ''">重置</el-button>
            </el-form-item>
        </el-form> -->
        <!-- 建议列表 -->
        <el-table :data="recommendations" style="width: 100%">
            <el-table-column label="建议ID" width="250" prop="id"></el-table-column>
            <el-table-column label="建议标题" width="350" prop="title"></el-table-column>
            <el-table-column label="建议时间" width="450" prop="createTime"> </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button :icon="Pointer" circle plain type="primary" v-if="userInfo.rolelevel > 0"
                        @click="showRecommendation(row)"></el-button>
                    <!-- <el-button :icon="Edit" circle plain type="primary" v-if="userInfo.rolelevel > 2"
                        @click="showActivity(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" v-if="userInfo.rolelevel > 2"
                        @click="deleteActivity(row)"></el-button> -->
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />



        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="建议详情" direction="rtl" size="50%">
            <el-form :model="recommendaModel" label-width="100px">

                <!-- <el-descriptions :title="recommendaModel.title">
                    <el-descriptions-item label="建议内容">recommendaModel.content</el-descriptions-item>
                    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                    <el-descriptions-item label="Remarks">
                        <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="Address">
                        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                    </el-descriptions-item>
                </el-descriptions> -->


                <el-form-item label="建议标题">
                    <el-input v-model="recommendaModel.title" placeholder="请输入标题" disabled></el-input>
                </el-form-item>


                <el-form-item label="建议时间">
                    <el-input v-model="recommendaModel.createTime" placeholder="请输入标题" disabled></el-input>
                </el-form-item>



                <el-form-item label="建议内容">

                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="recommendaModel.content" contentType="html"
                            readOnly=true>
                        </quill-editor>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" v-if="userInfo.rolelevel > 1" @click="deleteActivity()"> 删除建议
                    </el-button>

                </el-form-item>
            </el-form>
        </el-drawer>




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

.demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-datetime-picker .block {
    padding: 0px 0;
    text-align: left;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}
</style>