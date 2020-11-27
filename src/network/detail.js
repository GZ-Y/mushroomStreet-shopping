import {request} from './request'

//获取详情页的基本数据
export function getDetailData(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//获取详情页的更多推荐数据
export function getDetailRecommendData(){
  return request({
    url:'/recommend'
  })
}

// 使用类的方式把需要用到的数据抽离出来，这样比较好操作
//主要看需要的数据存放在哪几个分支下
export class Goods {
  //这三个参数随便写，从实例传递过来的参数就是具体的路径
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title //白一的名字 = 白一，这样理解
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class Param{
  constructor(info, rule){
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}