<template>
  <div class="goods-list">
    <goods-list-item 
    v-for="(item,index) in thumbnail"
    :key="index"
    :thumbnail='item'/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    thumbnail:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }
</style>