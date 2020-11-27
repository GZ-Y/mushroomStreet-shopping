<template>
  <div class="categofy">
    <top-nav class="category-nav-bar">
      <div slot="topnavCenter">商品分类</div>
    </top-nav>
    <category-slide-bar :slide-bar='categoryLeftList' @slideBarItemClick='slideBarItemClick'/>
    <Scroll class="content" 
    ref="scroller" 
    :probe-type='3'
    @scroll="scrollYs">
      <category-detail :category-list='subCategoryList[currentIndex]'/>
      <tab-control :title='titles' 
      ref="tabControl" @tabClick="tabClick"/>
      <goods-list :thumbnail='categoryDetailList'/>
    </Scroll>
    <Back-top v-show="isBackTopShow" @click.native="topClick"/>
  </div>
</template>

<script>
import {
getCategory,
getSubCategory,
getCategoryDetail} from 'network/category';
import { backTopMinXin } from "@/common/mixin";

import TopNav from 'components/common/topnav/TopNav';
import Scroll from "components/common/scroll/Scroll";
import TabControl from 'components/contents/tabcontrol/TabControl';
import GoodsList from 'components/contents/goods/GoodsList';

import CategorySlideBar from './childComps/CategorySlideBar'
import CategoryDetail from './childComps/CategoryDetail'
import { log } from 'util';

export default {
  name: "Category",
  data() {
    return {
      categoryLeftList:[],//左侧数据
      subCategoryList:[],//右侧上数据
      categoryDetailList:[],//右侧下数据
      currentIndex:0,
      titles:["流行","新款","精选"],
      typeList:['pop','new','sell']
    };
  },
  mixins:[backTopMinXin],
  components:{
    TopNav,
    TabControl,
    Scroll,
    GoodsList,
    CategorySlideBar,
    CategoryDetail
  },
  created(){
    this._getCategory();
    this.$bus.$on('goodsImgLoad',()=>{
      this.$refs.scroller && this.$refs.scroller.refresh()
    })
  },
  methods:{
    slideBarItemClick(index){
      this.currentIndex = index;
      this.$refs.tabControl.currentIndex = 0
      this._getCategoryDetail(this.categoryLeftList[this.currentIndex].miniWallkey,'pop')
      this._getSubCategory(this.categoryLeftList[this.currentIndex].maitKey,index)  
      this.$refs.scroller.refresh()
    },
    //这个是左侧按钮的数据
    _getCategory(){
      getCategory().then(res=>{
        this.categoryLeftList = res.data.category.list;
        this.$nextTick(()=>{
          //初始化数据
          //把categoryLeftList数组的第一个对象中的属性maitKey,保存到subCategoryList索引0里面去
          this._getSubCategory(this.categoryLeftList[0].maitKey,0);
          //pop分类下面的categoryLeftList数组当中的第一个对象中的属性miniWallkey，
          //保存到categoryDetailList里面去
          this._getCategoryDetail(this.categoryLeftList[0].miniWallkey,'pop')
          })
      });
    },
    //这个是右侧上方小图标的数据
    _getSubCategory(key,index){
        getSubCategory(key).then(res=>{
        this.subCategoryList[index] = res.data.list
      });
    },
    //右侧下方大图片数据
    _getCategoryDetail(key,type){
        getCategoryDetail(key,type).then(res=>{
        this.categoryDetailList = res
      })
    },
    //tabControl切换分类
    tabClick(index){
      this._getCategoryDetail(this.categoryLeftList[this.currentIndex].miniWallkey,this.typeList[index])
    },
    //滚动条传递position.y值，给mixin文件当中封装好的函数
    scrollYs(position){
      this.postionShow(position)
    },
    //返回顶部
    topClick(){
      this.$refs.scroller.scrollTo(0,0)
    }
  }
};
</script>
<style scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.content {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>