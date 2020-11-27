<template>
  <div class="tab-control"> 
    <div class="tab-control-item" 
    v-for="(item,index) in title" 
    :key="item" >
    <span  @click="btnClick(index)"
    :class="{active:currentIndex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    btnClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
  
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}

.active {
  border-bottom: 2px solid var(--color-tint);
  color: var(--color-high-text);
}
</style>