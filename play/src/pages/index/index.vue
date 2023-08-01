<script lang="ts" setup>
import TnGraphicCard from '../../packages/src/index.vue'

const graphicData: {
  id: number
  avatar: string
  title: string
  description: string
  tags: string[]
  content: string
  images: string[]
  viewCount: number
  commentCount: number
  likeCount: number
  viewUserAvatars: string[]
}[] = []

const generateData = () => {
  for (let i = 0; i < 10; i++) {
    graphicData.push({
      id: i,
      avatar: 'https://tnuiimage.tnkjapp.com/uniapp_market/circle/3-image.jpg',
      title: '文章标题',
      description: '2023年6月30日',
      tags: ['标签1', '标签2'],
      content:
        '看看打开打开年份记得当年开始放假哦额外欺骗人u饿哦漂亮放佛怕打雷舒服呢我脾气破费了发多少呢；否，可能打飞机哦喷泉哦怕可能地方打开螺丝粉年份的肌肤看能否。',
      images: Array.from({ length: i + 1 }).map(
        () => 'https://tnuiimage.tnkjapp.com/swiper/ad1.jpg'
      ),
      viewCount: 100 + i,
      commentCount: 101 + i,
      likeCount: 102 + i,
      viewUserAvatars: [
        'https://tnuiimage.tnkjapp.com/avatar/normal/1.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/2.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/3.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/4.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/5.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/6.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/7.png',
        'https://tnuiimage.tnkjapp.com/avatar/normal/8.png',
      ],
    })
  }
}
generateData()
</script>

<template>
  <view class="demo-container tn-gray-light_bg">
    <view v-for="(item, index) in graphicData" :key="index" class="item">
      <TnGraphicCard
        :avatar="item.avatar"
        :title="item.title"
        :description="item.description"
        :tags="item.tags"
        :content="item.content"
        :images="item.images"
        :view-count="item.viewCount"
        :comment-count="item.commentCount"
        :like-count="item.likeCount"
        :view-user-avatars="item.viewUserAvatars"
        active-like
      >
        <template #briefOperation> 关注 </template>
      </TnGraphicCard>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-container {
  width: 100%;
}
.item + .item {
  margin-top: 16px;
}
</style>
