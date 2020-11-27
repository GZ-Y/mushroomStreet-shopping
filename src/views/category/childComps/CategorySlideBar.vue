<template>
  <div class="slide-bar">
    <Scroll class="slide-bar-height">
      <div v-for="(item,index) in slideBar" :key="index">
        <button class="slide-bar-item"
        :class="['slide-bar-item',{active:currentIndex===index}]"
        @click="categoryClick(index)">
          {{item.title}}
        </button>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
// import { AssertionError } from 'assert';

export default {
  name: "CategorySlideBar",
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    Scroll
  },
  props: {
    slideBar: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    categoryClick(index) {
      this.currentIndex = index;
      this.$emit('slideBarItemClick',index)
    }
  }
};
</script>
<style scoped>
.slide-bar {
  width: 100%;
}

.slide-bar-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  width: 100px;
  background-color: #f6f6f6;
}

.slide-bar-item {
  font-size: 14px;
  line-height: 45px;
  width: 100px;
  height: 45px;
  user-select: none;
  text-align: center;
  color: #666666;
  border: 0;
  outline: none;
  background: none;
}

.slide-bar-item.active {
  font-weight: 700;
  color: #ff5777;
  border-left: 3px solid #ff5777;
  background-color: #ffffff;
}
</style>