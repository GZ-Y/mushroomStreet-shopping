<template>
  <div id="app">
    <!-- 使用Vuex来控制main-tab-bar隐藏与显示 -->
    <main-tab-bar v-show="$store.getters.mainTabBarShow"/>
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import MainTabBar from "components/contents/maintabbar/MainTabBar";

export default {
  name:'app',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/Base.css";
</style>
