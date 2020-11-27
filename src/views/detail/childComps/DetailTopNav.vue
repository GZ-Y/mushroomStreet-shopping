<template>
  <div id="detail-top-nav">
    <top-nav class="top-nav">
      <div slot="topnavLeft" @click="backOff"> 
          &lt;
      </div>
      <div slot="topnavCenter" class="center">
        <div 
        v-for="(item,index) in titles"
        :key="index"
        @click="sizeClick(index)"
        :class="{isActive:currentIndex === index}">
        {{item}}
        </div>
      </div>
    </top-nav>
  </div>
</template>

<script>
import TopNav from "components/common/topnav/TopNav";

export default {
  name:'DetailTopNav',
  components:{
    TopNav
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    backOff(){
      this.$router.go(-1)
    },
    sizeClick(index){
      this.currentIndex = index
      this.$emit('navClick',index)
      
    }
  }
};
</script>

<style scoped>
  .top-nav {
    background-color: #fff;
    color: #666666;
    box-shadow: 0px 1px #c0c0c0;
  }

  .center {
    display: flex;
  }

  .center > div {
    flex: 1;
  }

  .isActive{
    color: pink
  }
</style>