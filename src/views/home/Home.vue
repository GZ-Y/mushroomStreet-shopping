<template>
  <div id="home">
    <top-nav>
      <div slot="topnavCenter">首页</div>
    </top-nav>
    <tab-control 
      class="tabControl1"
      :title='["流行","新款","精选"]' 
      @tabClick='tabClick'
      ref="tabControl1"
      v-show="showNav"/>

    <Scroll class="content"
    :probe-type=3
    :pull-up-load='true'
    @scroll='getPosition'
    ref="scroller"
    @pullingUp='imgMore'>
      <home-swiper :banners='banners' @imageLoad='imageLoad'/>
      <home-recommend :recommends='recommends' />
      <home-popular />
      <tab-control
      class="tabControl2"
      :title='["流行","新款","精选"]' 
      @tabClick='tabClick'
      ref="tabControl2"/>
      <goods-list :thumbnail='currentShow'/>
    </Scroll>
    <back-top @click.native='toTopClick' v-show="showBackTop"/>
  </div>
</template>

<script>
import TopNav from "components/common/topnav/TopNav";
import Scroll from "components/common/scroll/Scroll";

import TabControl from 'components/contents/tabcontrol/TabControl'
import GoodsList from 'components/contents/goods/GoodsList'
import BackTop from 'components/contents/backtop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomePopular from "./childComps/HomePopular";

import { getHomeBannersData,getHomeGoodsData } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        pop:{page:0,list:[]},
        new:{page:0,list:[]},
        sell:{page:0,list:[]}
      },
      currentType:'pop',
      showNav:false,
      showBackTop:false,
      tabControlTop:0
    };
  },
  components: {
    TopNav,
    Scroll,
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    TabControl,
    GoodsList,
    BackTop
  },
  computed:{
    currentShow(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    getHomeBanners() {
      getHomeBannersData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type){
      //这个是每次在created当中调用getHomeGoods函数时让页面数+1
      const page = this.goods[type].page + 1 
      getHomeGoodsData(type,page).then(res=>{
        //...是es6当中的数组解构，可以把数据当中的元素都拿出来
        this.goods[type].list.push(...res.data.list);
        //这个是让data数据当中的page加+1
        this.goods[type].page += 1;
        //持续的下拉刷新，不然只能上拉加载一次！
        this.$refs.scroller.scroll.finishPullUp()
      });
    },
    tabClick(index){
      switch(index){
        case 0:
        this.currentType = 'pop';
        break;
        case 1:
        this.currentType = 'new';
        break;
        case 2:
        this.currentType = 'sell'
      }
      //让2个导航同步
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    getPosition(position){
      //显示与隐藏返回顶部的按钮
      this.showBackTop = -position.y > 800
      //显示与隐藏导航条
      if(-position.y > this.tabControlTop - 44){
        this.showNav = true
      }else{
        this.showNav = false
      }
    },
    imageLoad(){
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },
    toTopClick(){
      this.$refs.scroller.scrollTo(0,0)
    },
    imgMore(){
      this.getHomeGoods(this.currentType)
    }
  },
  //这里直接用created调用数据的话，还会出现最后一张与第一张之间的空白
  created() {
    this.getHomeBanners();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    this.$bus.$on('goodsImgLoad',()=>{
      console.log('---');
      //这里点击切换页面回来的时候会报错，就是二次点击
      this.$refs.scroller && this.$refs.scroller.refresh()
    })
  }
};
</script>
<style scoped>

.content{
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}

.tabControl1 {
    position: absolute;
    width: 100%;
    z-index: 100;
  }
</style>