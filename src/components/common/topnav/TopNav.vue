<template>
  <div class="top-nav">
    <div class="left">
      <slot name="topnavLeft"></slot>
    </div>
    <div class="center">
      <slot name="topnavCenter"></slot>
    </div>
    <div class="right">
      <slot name="topnavRight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav"
};
</script>
<style scoped>
    .top-nav {
      display: flex;
      height: 44px;
      line-height: 44px;
      color:#fff;
      background: var(--color-tint);
      text-align: center;
    }

    .left,
    .right
    {
      width: 60px;
    }

    .center {
      flex:1
    }
</style>