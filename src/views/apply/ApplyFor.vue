<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo';
const userInfoStore = useUserInfoStore();
const userInfo = ref({ ...userInfoStore.info })


let isSubmit = ref(false);
import { applyInfoService } from '@/api/apply';
const applyInfo = async () => {
    let result = await applyInfoService();

    if (result.data === null) {
        isSubmit.value = false
    } else {
        isSubmit.value = true
    }
}
applyInfo();
const rules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        {
            pattern: /^\S{1,5}$/,
            message: '姓名必须是1-5位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}
//修改个人信息
import { applyForService } from '@/api/apply';
import { ElMessage } from 'element-plus';


const applyModel = ref({
    "name": "",
    "email": "",
    "dormitory": "",
    "content": ""
})

//添加文章
const applyFor = async () => {
    //调用接口
    let result = await applyForService(applyModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功');
    //刷新列表
    // activityList();
}
const complexApply = async () => {
    await applyFor();
    applyInfo();
}

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
</script>
<template>
    <el-card class="page-container" v-if="isSubmit === false">
        <template #header>
            <div class="header">
                <span>申请入社</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="applyModel" :rules="rules" label-width="100px" size="large">

                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="applyModel.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="applyModel.email"></el-input>
                    </el-form-item>
                    <el-form-item label="寝室楼" prop="dormitory">
                        <el-input v-model="applyModel.dormitory"></el-input>
                    </el-form-item>
                    <el-form-item label="申请原因">
                        <div class="editor">
                            <quill-editor theme="snow" v-model:content="applyModel.content" contentType="html">
                            </quill-editor>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="complexApply()">提交申请</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>

    <div class="card-container">
        <el-card class="wide-card" v-if="isSubmit === true">
            您已发出加入社团申请，请等待审批
        </el-card>
    </div>


</template>

<style lang="scss" scoped>
.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}

.card-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中（如果需要） */
    min-height: 30vh;
    /* 使容器至少占满视口高度（可选） */
}

.wide-card {
    width: 80%;
    /* 设置宽度为父容器宽度的 80% */
    max-width: 800px;
    /* 设置最大宽度 */
    font-size: 24px;
    /* 增大字体大小 */
    text-align: center;
    /* 居中文本 */
}
</style>