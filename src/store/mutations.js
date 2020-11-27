import {
  SET_MAIN_TAB_BAR_SHOW,
  ADD_COUNT,
  ADD_SHOPP_CART} 
from './mutations_type'

export default {
  [SET_MAIN_TAB_BAR_SHOW](state,bol){
    state.mainTabBarShow = bol
  },
  [ADD_COUNT](state,payload){
    payload.count++
  },
  [ADD_SHOPP_CART](state,payload){
    payload.checked = true
    state.shoppingCart.push(payload);
  }
}