<template>
  <Swiper class="banswiper">
    <swiper-item v-for="(item,index) in detailBanImage" :key="index">
      <a href="">
        <img :src="item" alt="">
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    detailBanImage:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
<style scoped>
.banswiper{
  height: 260px;
  overflow: hidden;
}
</style>