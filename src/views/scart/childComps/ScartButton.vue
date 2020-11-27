<template>
<div class="cart-bottom-bar">
    <div class="total-check">
      <check-button  @click.native='change'/>
      <span>全选</span>
    </div>

    <div class="total-price">
      <span>合计：￥{{totalPrice}}</span>
    </div>

    <div class="calc">
      去结算({{totalCount}})
    </div>

  </div>
</template>

<script>
import CheckButton from "components/contents/checkbutton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["shoppCart"]),
    totalPrice() {
      return this.shoppCart
        .filter(item => {
          return item.checked;
        })
        .reduce((newVal, item) => {
          item.price = item.price.substr(1) - 0;
          return newVal + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.shoppCart.filter(item => {
        return item.checked;
      }).length;
    }
  }
};
</script>
<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  background: #eee;
  display: flex;
  line-height: 40px;
  text-align: center;
}
.total-check {
  width: 25%;
  display: flex;
  justify-content: center;
}
.total-price {
  width: 50%;
}
.calc {
  width: 25%;
  background-color: #ff5028;
  color: #fff;
}
</style>