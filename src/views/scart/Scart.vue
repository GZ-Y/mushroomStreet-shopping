<template>
  <div id="scart">
    <scart-top-nav />
    <Scroll class='content'>
      <scart-list />
    </Scroll>
    <scart-button />
  </div>
</template>

<script>
import ScartTopNav from './childComps/ScartTopNav'
import ScartList from './childComps/ScartList'
import ScartButton from './childComps/ScartButton'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: "Scart",
  components:{
    ScartTopNav,
    ScartList,
    ScartButton,
    Scroll
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
 .content{
    height: calc(100vh - 44px - 48px - 40px);
    overflow: hidden;
  }
</style>