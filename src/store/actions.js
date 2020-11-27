import {ADD_COUNT,ADD_SHOPP_CART} from './mutations_type'

export default {
  aCountPrice(context,payload){
    const oldProduct = context.state.shoppingCart.find(item=>{
      return item.iid === payload.iid
    });
    if(oldProduct){
      context.commit(ADD_COUNT,oldProduct)
    }else{
      payload.count = 1;
      context.commit(ADD_SHOPP_CART,payload)
    }
  }
}