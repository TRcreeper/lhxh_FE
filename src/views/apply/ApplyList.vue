<script setup>
import {
    Edit,
    Delete,
    More
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//用户搜索时选中的发布状态
const name = ref('')

//文章列表数据模型
const applys = ref([
    {
        "id": 1,
        "userId":8,
        "name": "隔壁老明",
        "email": "laoming@qq.com",
        "dormitory": "荷13",
        "applyTime": "2024-08-26 15:32:49",
        "content": "乐"
    },
    {
        "id": 1,
        "userId":8,
        "name": "隔壁老明",
        "email": "laoming@qq.com",
        "dormitory": "荷13",
        "applyTime": "2024-08-26 15:32:49",
        "content": "乐"
    },
    {
        "id": 1,
        "userId":8,
        "name": "隔壁老明",
        "email": "laoming@qq.com",
        "dormitory": "荷13",
        "applyTime": "2024-08-26 15:32:49",
        "content": "乐"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    applyList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    applyList()
}

// //回显文章分类
// import { activityCategoryListService, activityListService,activityAddService,activityUpdateService } from '@/api/activity.js'
// const activityCategoryList = async () => {
//     let result = await activityCategoryListService();
//     categorys.value = result.data;
// }

//获取文章列表数据
import { applyListService } from '@/api/apply';
const applyList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        // name: name.value ? name.value : null
    }
    let result = await applyListService(params);

    //渲染视图
    total.value = result.data.total;
    applys.value = result.data.items;

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

import useUserInfoStore from '@/stores/userInfo';
const userInfoStore = useUserInfoStore();
const userInfo = ref({ ...userInfoStore.info })

// activityCategoryList();
applyList();

//控制弹窗是否显示
const dialogVisible = ref(false)

const applyModel = ref({
    id: '',
    userId:'',
    name: "",
    email: "",
    dormitory: "",
    applyTime: ""
})
//展示编辑弹窗
const showApply = (row) => {
    dialogVisible.value = true

    //数据拷贝
    applyModel.value.id = row.id;
    applyModel.value.userId=row.userId;
    applyModel.value.name = row.name;
    applyModel.value.email = row.email;
    applyModel.value.dormitory = row.dormitory;
    applyModel.value.applyTime = row.applyTime;

    applyModel.value.content = row.content.replace(/<\/?p[^>]*>/g, "").trim();
}
import { ElMessage } from 'element-plus';
import { applyDeleteService } from '@/api/apply';
const deleteApply=async()=>{
    let result = await applyDeleteService(applyModel.value.id);
    ElMessage.info(result.msg?result.msg:'已拒绝该申请');
    applyList();
    dialogVisible.value=false;
}

const memberModel = ref({
    id: '',
    name: "",
    email: "",
    dormitory: ""
})
import { deleteApplyAndAddMemberService } from '@/api/member';
const agreeApply=async()=>{
    memberModel.value.id=applyModel.value.id;
    memberModel.value.userId=applyModel.value.userId;
    memberModel.value.name=applyModel.value.name;
    memberModel.value.email=applyModel.value.email;
    memberModel.value.dormitory=applyModel.value.dormitory;
    let result=await deleteApplyAndAddMemberService(applyModel.value.id,memberModel.value); 
    // let result2 = await applyDeleteService(applyModel.value.id);
    // ElMessage.info(result1.msg && result2.msg ? result1.msg + result2.msg : '已同意该申请');
    ElMessage.info(result.msg?result.msg:'已同意该申请');
    applyList();
    dialogVisible.value=false;
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>入社审批</span>
                <!-- <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true;title='添加活动';clearData()">添加活动</el-button>
                </div> -->
            </div>
        </template>
        <!-- 搜索表单 -->
        <!-- <el-form inline>
            <el-form-item label="姓名查询：">
                <el-input v-model="name" style="width: 240px" placeholder="请输入要查询姓名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="memberList">搜索</el-button>
                <el-button @click="name = ''">重置</el-button>
                <el-button v-if="userInfo.rolelevel > 2" @click="downloadUsers">下载学生数据</el-button>
            </el-form-item>
        </el-form> -->
        <!-- 学生列表 -->
        <el-table :data="applys" style="width: 100%">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="寝室楼" prop="dormitory"></el-table-column>
            <el-table-column label="邮箱" width="400" prop="email"> </el-table-column>
            <el-table-column label="申请时间" prop="applyTime"></el-table-column>

            <el-table-column label="审批" width="100">
                <template #default="{ row }">

                    <el-button :icon="More" circle plain type="primary" @click="showApply(row)"></el-button>
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


        <!-- 添加申请详情弹窗 -->
        <el-dialog v-model="dialogVisible" title="申请详情" width="50%">
            <el-form :model="applyModel" label-width="100px" style="padding-right: 30px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="applyModel.name" minlength="1" maxlength="10" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="emial">
                    <el-input v-model="applyModel.email" minlength="1" maxlength="10" disabled></el-input>
                </el-form-item>
                <el-form-item label="宿舍楼" prop="dormitory">
                    <el-input v-model="applyModel.dormitory" minlength="1" maxlength="15" disabled></el-input>
                </el-form-item>

                <div>
                    <el-divider />
                    <span style="display: block; text-align: center; width: 100%; font-weight: bold; font-size: 18px;">
                        申请原因：
                    </span>

                    <span>
                        &nbsp;&nbsp;{{ applyModel.content }}
                    </span>

                    <span style="display: block; text-align: right; width: 100%; font-weight: bold;">
                        申请时间：
                    </span>
                    <span style="display: block; text-align: right; width: 100%; font-weight: bold; ">
                        {{ applyModel.applyTime }}
                    </span>

                </div>

            </el-form>
            <template #footer>
                <span class=" dialog-footer">
                    <el-button @click="deleteApply()">拒绝</el-button>
                    <el-button type="primary" @click="agreeApply()"> 同意
                    </el-button>
                </span>
            </template>
        </el-dialog>
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