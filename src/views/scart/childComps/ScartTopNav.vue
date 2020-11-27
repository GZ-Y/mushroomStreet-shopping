<template>
  <div id="scart-top-nav">
    <top-nav>
      <div slot="topnavCenter">购物车({{$store.getters.shoppCartLength}})</div>
    </top-nav>
  </div>
</template>

<script>
import TopNav from "components/common/topnav/TopNav";

export default {
  name: "ScartTopNav",
  components:{
    TopNav
  },
  data() {
    return {};
  }
};
</script>
<style scoped>


</style>