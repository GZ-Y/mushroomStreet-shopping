<template>
  <div class="tab-bar-item" @click="btnClick">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String
  },
  methods:{
    btnClick(){
      this.$router.replace(this.path)
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item img {
  width: 25px;
  height: 25px;
  vertical-align:top
}
</style>