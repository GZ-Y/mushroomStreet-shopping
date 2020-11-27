import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//使用懒加载方式导入页面
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Scart = () => import('views/scart/Scart')
const My = () => import('views/my/My')
const Detail = () => import('views/detail/Detail')

//映射路由
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/categofy',
    component: Category
  },
  {
    path: '/scart',
    component: Scart
  },
  {
    path: '/my',
    component: My
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history' //路径名前面去掉#
})

export default router
