export default {
  mainTabBarShow:state => state.mainTabBarShow,
  shoppCart(state){
    return state.shoppingCart
  },
  shoppCartLength(state,getters){
    return getters.shoppCart.length
  }
}