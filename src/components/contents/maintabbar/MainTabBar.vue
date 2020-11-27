<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item path='/home'>
        <img slot="item-icon" src="~assets/img/home/home.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/categofy'>
        <img slot="item-icon" src="~assets/img/category/category.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/scart'>
        <img slot="item-icon" src="~assets/img/scart/scart.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/my'>
        <img slot="item-icon" src="~assets/img/my/my.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
  #app img{
    margin-top: 3px
  }
</style>