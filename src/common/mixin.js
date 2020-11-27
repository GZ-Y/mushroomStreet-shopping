import BackTop from 'components/contents/backtop/BackTop'

export const backTopMinXin = {
  data(){
    return {
      isBackTopShow : false
    }
  },
  components:{
    BackTop
  },
  methods:{
    postionShow(position){
      this.isBackTopShow = -position.y >= 800
    },
    backTopClick(){
      this.$refs.scroller.scrollTo(0,0,300)
    }
  },

}