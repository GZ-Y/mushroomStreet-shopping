<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
<style scoped>
.home-recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-bottom: 10px solid #eee;
}
.home-recommend-item {
  flex: 1;
}
.home-recommend-item img {
  width: 70px;
  height: 65px;
  border-radius: 100%;
}
</style>