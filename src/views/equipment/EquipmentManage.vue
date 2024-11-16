<script setup>
import {
    Edit,
    Delete,
    Pointer,
    InfoFilled
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
const equipments = ref([
    {
        "id": 3,
        "name": "音响",
        "description": "常规用音响",
        "memberId": 1,
        "memberName": "王子涵"
    },
    {
        "id": 3,
        "name": "音响",
        "description": "常规用音响",
        "memberId": 1,
        "memberName": "王子涵"
    },
    {
        "id": 3,
        "name": "音响",
        "description": "常规用音响",
        "memberId": 1,
        "memberName": "王子涵"
    }
])

// //用户搜索时选中的分类id
// const categoryId = ref('')

// //用户搜索时选中的发布状态
// const state = ref('')

// //文章列表数据模型
// const activities = ref([
//     {
//         "id": 5,
//         "title": "陕西旅游攻略",
//         "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
//         "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
//         "state": "草稿",
//         "categoryId": 2,
//         "createTime": "2023-09-03 11:55:30",
//         "updateTime": "2023-09-03 11:55:30"
//     },
//     {
//         "id": 5,
//         "title": "陕西旅游攻略",
//         "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
//         "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
//         "state": "草稿",
//         "categoryId": 2,
//         "createTime": "2023-09-03 11:55:30",
//         "updateTime": "2023-09-03 11:55:30"
//     },
//     {
//         "id": 5,
//         "title": "陕西旅游攻略",
//         "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
//         "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
//         "state": "草稿",
//         "categoryId": 2,
//         "createTime": "2023-09-03 11:55:30",
//         "updateTime": "2023-09-03 11:55:30"
//     },
// ])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    equipmentList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    equipmentList()
}

import { equipmentListService, equipmentAddService, equipmentUpdateService } from '@/api/equipment';
//获取活动列表数据
const equipmentList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    }
    let result = await equipmentListService(params);

    //渲染视图
    total.value = result.data.total;
    equipments.value = result.data.items;

    // //处理数据，给数据模型扩展一个分类名称属性
    // for (let i = 0; i < equipments.value.length; i++) {
    //     let activity = activities.value[i];
    //     for (let j = 0; j < categorys.value.length; j++) {
    //         if (activity.categoryId == categorys.value[j].id) {
    //             activity.categoryName = categorys.value[j].categoryName;
    //         }
    //     }
    // }
}

equipmentList();

import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage, ElMessageBox } from 'element-plus';
//控制抽屉是否显示
const visibleDrawer = ref(false)
const visibleDrawer2 = ref(false)
//添加表单数据模型
const equipmentModel = ref({
    id: '',
    name: '',
    // coverImg: '',
    description: '',
    memberId: '',
    memberName: "王子涵"
})

//添加设备
const addEquipment = async () => {

    //调用接口
    let result = await equipmentAddService(equipmentModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功');
    visibleDrawer.value = false;
    //刷新列表
    equipmentList();
}



//定义变量控制标题展示
const title = ref('')


//展示编辑弹窗
const showEquipment = (row) => {
    visibleDrawer.value = true; title.value = '编辑设备'
    //数据拷贝
    equipmentModel.value.id = row.id;
    equipmentModel.value.name = row.name;
    equipmentModel.value.description = row.description;
    equipmentModel.value.memberId = row.memberId;
    equipmentModel.value.memberName = row.memberName;


}



const updateEquipment = async (clickState) => {
    equipmentModel.value.state = clickState;
    //调用接口
    let result = await equipmentUpdateService(equipmentModel.value);
    ElMessage.success(result.msg ? result.msg : '修改成功');
    visibleDrawer.value = false;
    //刷新列表
    equipmentList();
}

//清空模型数据
const clearData = () => {
    equipmentModel.value.id = '';
    equipmentModel.value.name = '';
    equipmentModel.value.description = ' ';
    equipmentModel.value.memberId = '';
    equipmentModel.value.memberName = '';
}

// import { activityDeleteService } from '@/api/activity.js';
import { equipmentDeleteService } from '@/api/equipment';
//删除分类
const deleteEquipment = (row) => {
    //提示用户 确认框
    ElMessageBox.confirm(
        '你确认要删除该活动信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await equipmentDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            equipmentList();
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

const borrowModel = ref({
    equipmentId: '',
    duration: 1
})
const showEquipment2 = async (row) => {
    // addOrDelete();
    //数据拷贝
    equipmentModel.value.id = row.id;
    equipmentModel.value.name = row.name;
    equipmentModel.value.description = row.description;
    equipmentModel.value.memberId = row.memberId;
    equipmentModel.value.memberName = row.memberName;

    borrowModel.value.equipmentId = row.id;
    visibleDrawer2.value = true;


}

// const addOrDelete = async () => {
//     let participateInfo = await participateInfoService(participateModel.value.activityId);
//     visibleDrawer2.value = true;
//     if (participateInfo.data === null) {
//         participateOrWithdraw.value = "参加活动";

//     } else {
//         participateOrWithdraw.value = "退出活动";
//     }
// }

import { borrowAddService } from '@/api/borrow';

const addBorrow = async () => {
    let result = await borrowAddService(borrowModel.value)
    // addOrDelete();
    ElMessage.success(result.msg ? result.msg : '借用设备成功')
    visibleDrawer2.value = false;
    equipmentList();
}

// const deleteParticipate = async () => {
//     let result = await participateDeleteService(participateModel.value.activityId)
//     addOrDelete();
//     ElMessage.success(result.msg ? result.msg : '退出活动成功')
// }

const dialogVisible = ref(false)





// //文章列表数据模型
// const participates = ref([
//     {
//         "activityId": 1,
//         "memberId": 8,
//         "name": "隔壁老明",
//         "title": "常规",
//     },
//     {
//         "activityId": 1,
//         "memberId": 8,
//         "name": "隔壁老明",
//         "title": "常规",
//     },
//     {
//         "activityId": 1,
//         "memberId": 8,
//         "name": "隔壁老明",
//         "title": "常规",
//     },
// ])

// //分页条数据模型
// const pageNum_p = ref(1)//当前页
// const total_p = ref(20)//总条数
// const pageSize_p = ref(3)//每页条数

// //当每页条数发生了变化，调用此函数
// const onSizeChange_p = (size) => {
//     pageSize_p.value = size
//     participateList()
// }
// //当前页码发生变化，调用此函数
// const onCurrentChange_p = (num) => {
//     pageNum_p.value = num
//     participateList()
// }


// //获取文章列表数据
// import { participateListService } from '@/api/participate';
// const participateList = async () => {
//     let params = {
//         pageNum: pageNum_p.value,
//         pageSize: pageSize_p.value,
//         activityId: participateModel.value.activityId
//     }
//     let result = await participateListService(params);

//     //渲染视图
//     total_p.value = result.data.total;
//     participates.value = result.data.items;
// }
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>闲置设备</span>
                <div class="extra">
                    <el-button type="primary" v-if="userInfo.rolelevel > 1"
                        @click="visibleDrawer = true; title = '添加设备'; clearData()">添加设备</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <!-- <el-form inline>
            <el-form-item label="文章分类：">
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
        <!-- 文章列表 -->
        <el-table :data="equipments" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="设备名称" prop="name"></el-table-column>
            <!-- <el-table-column label="设备描述" prop="description"> </el-table-column> -->
            <el-table-column label="提供者" prop="memberName"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button :icon="Pointer" circle plain type="primary" v-if="userInfo.rolelevel > 1"
                        @click="showEquipment2(row)"></el-button>
                    <el-button :icon="Edit" circle plain type="primary"
                        v-if="userInfo.rolelevel > 2 || userInfo.memberId === row.memberId"
                        @click="showEquipment(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"
                        v-if="userInfo.rolelevel > 2 || userInfo.memberId === row.memberId"
                        @click="deleteEquipment(row)"></el-button>
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


        <!-- 抽屉1 -->
        <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="equipmentModel" label-width="100px">
                <el-form-item label="设备名称">
                    <el-input v-model="equipmentModel.name" placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="activityModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="文章封面">

                    <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false">
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="设备描述">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="equipmentModel.description" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="title == '添加设备' ? addEquipment() : updateEquipment()">发布</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

        <!-- 抽屉2 -->
        <el-drawer v-model="visibleDrawer2" title="设备详情" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="equipmentModel" label-width="100px">
                <el-form-item label="设备名称">
                    <el-input v-model="equipmentModel.name" placeholder="请输入标题" disabled></el-input>
                </el-form-item>
                <el-form-item label="提供者">
                    <el-input v-model="equipmentModel.memberName" placeholder="请输入标题" disabled></el-input>
                </el-form-item>



                <el-form-item label="设备描述">

                    <!-- <span >
                        {{ activityModel.content.replace(/<p>.*?<\/p>/g, '') }}
                    </span> -->
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="equipmentModel.description" contentType="html"
                            readOnly=true>
                        </quill-editor>
                    </div>
                </el-form-item>

                <el-form-item label="借用天数">
                    <el-input-number v-model="borrowModel.duration" :min="1" :max="10" @change="handleChange" />
                </el-form-item>

                <!-- <el-form-item>
                    <el-button type="primary" @click="addBorrow()">借用</el-button>
                </el-form-item> -->

                <el-form-item>
                    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="你确定要借用此设备吗?" @confirm="addBorrow()" @cancel="">
                        <template #reference>
                            <el-button>借用设备</el-button>
                        </template>
                    </el-popconfirm>
                </el-form-item>

            </el-form>
        </el-drawer>


        <!-- 参加活动会员列表弹窗 -->
        <!-- <el-dialog v-model="dialogVisible" title="活动参加会员" width="70%">
            <el-form :model="participateModel" label-width="100px" style="padding-right: 30px">

                <el-table :data="participates" style="width: 100%">
                    <el-table-column label="会员ID" prop="memberId"></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>

                    <el-table-column label="操作" width="100">
                        <template #default="{ row }">
                            <el-button :icon="More" circle plain type="primary" @click=""></el-button>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <el-empty description="没有数据" />
                    </template>
                </el-table>


                <el-pagination v-model:current-page="pageNum_p" v-model:page-size="pageSize_p"
                    :page-sizes="[3, 5, 10, 15]" layout="jumper, total, sizes, prev, pager, next" background
                    :total="total_p" @size-change="onSizeChange_p" @current-change="onCurrentChange_p"
                    style="margin-top: 20px; justify-content: flex-end" />



            </el-form>
            <template #footer>
                <span class=" dialog-footer">
                    <el-button @click="">拒绝</el-button>
                    <el-button type="primary" @click=""> 同意
                    </el-button>
                </span>
            </template>
        </el-dialog> -->

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