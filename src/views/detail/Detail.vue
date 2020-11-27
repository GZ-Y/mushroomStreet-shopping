<template>
  <div id="detail">
    
    <detail-top-nav @navClick='navClick' ref="topNav"/>
    <Scroll 
    class="content" 
    ref="scroller" 
    :probe-type='3'
    @scroll="scrollYs">
      <detail-swiper :detail-ban-image='detailBanImage'/>
      <detail-goods-info :goods-info='goodsInfo'/>
      <detail-shop-info :shop-info='shopInfo'/>
      <detail-image-info :image-info='imageInfo' @imageLoad='imageLoad'/>
      <detail-param-info :param-info='paramInfo' ref="param"/>
      <detail-comment-info :comment-info='commentInfo' ref="comment"/>
      <goods-list :thumbnail='recommendList' ref="goods"/>
    </Scroll>
    <detail-bottom-bar @addShopp='addShopp'/>
    <back-top @click.native="backTopClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
import DetailTopNav from "./childComps/DetailTopNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/contents/goods/GoodsList";

import {
  getDetailData,
  getDetailRecommendData,
  Goods,
  Shop,
  Param
} from "network/detail";

import { debounce } from "@/common/utils";
import { backTopMinXin } from "@/common/mixin";

import { log } from "util";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailTopNav,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins:[backTopMinXin],
  data() {
    return {
      iid: null,
      currentIndex: 0,
      detailBanImage: [],
      goodsInfo: {},
      shopInfo: {},
      imageInfo: {},
      paramInfo: {},
      commentInfo: {},
      addCart:{},
      recommendList: [],
      assTopYs: [],
    };
  },
  //进入详情页则隐藏maintabbar
  beforeCreate() {
    this.$store.commit("setMainTabBarShow", false);
  },
  //离开时则显示maintabbar
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setMainTabBarShow", true);
    next();
  },
  created() {
    this.getDetail();//调用详情页相关数据
    this.getDetailRecommend();//调用推荐数据
    //推荐数据图片卡顿问题解决
    this.$bus.$on('goodsImgLoad',()=>{
      this.$refs.scroller && this.$refs.scroller.refresh()
    })
  },
  // mounted(){
  //   console.log(this.recommendList);
  // },
  methods: {
    addShopp(){
      console.log(this.addCart);
      this.$store.dispatch('aCountPrice',this.addCart)
    },
    getDetail() {
      this.iid = this.$route.params.iid;
      getDetailData(this.iid).then(res => {
        this.addCart = res.result.itemInfo
        //请求轮播图
        const data = res.result;
        this.detailBanImage = data.itemInfo.topImages;
        //请求商品的详情数据
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //请求店铺详情
        this.shopInfo = new Shop(data.shopInfo);
        //详情图片信息
        this.imageInfo = data.detailInfo;
        //商品参数信息
        this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);
        //评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      });
      
    },
    //请求相关推荐图片数据
    getDetailRecommend() {
      getDetailRecommendData().then(res => {
        this.recommendList = res.data.list;
      });
    },
    //监听图片加载
    imageLoad() {
      if (this.$refs.scroller) {
        this.$refs.scroller.refresh();
        //图片比较大，要等到图片加载完之后再来获取offsetTop值
        const getImageTops = debounce(() => {
          this.assTopYs.push(0),
          this.assTopYs.push(this.$refs.param.$el.offsetTop);
          this.assTopYs.push(this.$refs.comment.$el.offsetTop);
          this.assTopYs.push(this.$refs.goods.$el.offsetTop);
          this.assTopYs.push(Number.MAX_VALUE); //js当中的最大值
        });
        getImageTops(); //调用一下把获取到的offsetTop值添加到数组当中去。
      }
    },
    //点击导航条，让页面滚动到对应区域
    navClick(index) {
      this.$refs.scroller.scrollTo(0, -this.assTopYs[index], 200);
    },
    //滚动对应区域，导航条添加类
    scrollYs(position) {
      for (let i in this.assTopYs) {
        i = i * 1; //为了转换为Number
        //如果在assTopYs数组当中有了最大值
        //就不需要再写(===length - 1)的判断了,因为有了>和<的中间值。
        if (
          -position.y >= this.assTopYs[i] &&
          -position.y < this.assTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.topNav.currentIndex = this.currentIndex;
        }
      };
      this.postionShow(position)
    }
  }
};
</script>

<style scoped>
#datail {
  position: relative;
  z-index: 101;
  background-color: #fff;
}

.content {
  position: relative;
  height: calc(100vh - 44px - 48px);
  overflow: hidden;
}
</style>