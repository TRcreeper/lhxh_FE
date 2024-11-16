<script setup>
import { ref } from 'vue';
import image1 from '@/assets/首页图片1.jpg';
import image2 from '@/assets/首页图片2.jpg';
import image3 from '@/assets/首页图片3.jpg';
import image4 from '@/assets/首页图片4.jpg';

const images = ref([
    { id: 1, src: image1, alt: 'Image 1' },
    { id: 2, src: image2, alt: 'Image 2' },
    { id: 3, src: image3, alt: 'Image 3' },
    { id: 4, src: image4, alt: 'Image 4' }
])

const informationModel = ref({
    title: '',
    content: '',
    releaseTime: '',
    createMember: '',
})

import { informationService } from '@/api/information';
const information=async()=>{
    let result=await informationService()
    informationModel.value.title=result.data.title;
    informationModel.value.content=result.data.content;
    informationModel.value.createMember=result.data.createMember;
    informationModel.value.releaseTime=result.data.releaseTime;
}
information()
</script>


<template>
    <div class="block text-center">
        <span class="demonstration">社团活动宣传</span>
        <el-carousel height="300px" type="card" motion-blur>
            <el-carousel-item v-for="image in images" :key="image.id">
                <img :src="image.src" :alt="image.alt" class="carousel-image" />
            </el-carousel-item>
        </el-carousel>
    </div>

    <el-divider />

    <el-card style="max-width: 800px; margin: 0 auto;">
        <template #header>
            <div class="card-header">
                <span
                    style="font-size: 28px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #2c3e50;">{{informationModel.title}}</span>
            </div>
        </template>
        <div v-html="informationModel.content" style="font-size: 18px;line-height: 1.6;color: #34495e;max-width: 800px;margin: 0 auto;padding: 0 20px;text-indent: 2em;"></div>
        
        <!-- <p style="font-size: 18px;line-height: 1.6;color: #34495e;max-width: 800px;margin: 0 auto;padding: 0 20px;text-indent: 2em;">
            {{ informationModel.content }}
        </p> -->
        <!-- <p style="font-size: 18px;line-height: 1.6;color: #34495e;max-width: 800px;margin: 0 auto;padding: 0 20px;text-indent: 2em;">
            无论你是新成员还是老朋友，我们都欢迎你的参与！快来加入我们，共同创造更多美好的回忆吧！
        </p> -->
        <!-- <template #footer>Footer content</template> -->
    </el-card>

</template>



<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.carousel-image {
    width: 100%;
    height: auto;
    /* 让图片的高度自动适应，以保持其宽高比 */
    object-fit: cover;
    /* 如果需要裁剪图片以填满容器，可以使用 cover */
}

.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; 确保内容不会超出容器 */
}

.section-title {
    font-size: 28px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #2c3e50;
}

.section-content {
    font-size: 18px;
    line-height: 1.6;
    color: #34495e;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}
</style>