<template>
  <div class="scart-list">
    <div class="list-item" v-for="(item,index) in shoppCart" :key="index">
      <div class="item-selector" >
        <check-button :is-check="item.checked" @click.native="changeCheck(item)" />
      </div>
      <div class="item-img">
        <img :src="item.topImages[0]" alt="商品图片">
      </div>
      <div class="item-info">
        <div class="item-title">{{item.title}}</div>
        <div class="item-desc">{{item.desc}}</div>
        <div class="info-bottom">
          <div class="item-price">￥{{item.price}}</div>
          <div class="item-count">x{{item.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/contents/checkbutton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "",
  components:{
    CheckButton,
  },
  computed:{
    ...mapGetters(['shoppCart'])
  },
  methods:{
    changeCheck(item){
      // const shoppCart = {...this.shoppCart}
      // console.log(shoppCart);
      // console.log(this.shoppCart[0]);
      // this.itemChecked = this.shoppCart[0].checked || !this.shoppCart[0].checked
      // this.shoppCart[0].checked = !this.shoppCart[0].checked
      console.log(item.checked);
      item.checked = !item.checked
    }
  }
};
</script>
<style scoped>
.list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.item-title {
  font-size: 18px;
  margin-bottom: 4px;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info,
.item-desc {
  color: #666;
  font-size: 14px;
}
.item-desc {
  margin-top: 15px;
}
.info-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.item-price {
  color: #ffb805;
  font-size: 20px;
}
.item-count {
  font-size: 20px;
}
</style>