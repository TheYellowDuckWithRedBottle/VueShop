import Vue from 'vue'
import Router from 'vue-router'

const Login=()=>import ('@/views/Login/Login')
const Home=()=>import('@/views/Home/Home')
const UserInfo=()=>import('@/views/Home/HomeChildren/userInfo')

const Role=()=>import('@/views/Home/HomeChildren/PowerManager/RoleCom')
const Right=()=>import('@/views/Home/HomeChildren/PowerManager/RightCom')

const GoodCategory=()=>import('@/views/Home/HomeChildren/GoodsManager/GoodsCategory')
const CategoryParameter=()=>import('@/views/Home/HomeChildren/GoodsManager/CategoryParameter')
const GoodsList=()=>import('@/views/Home/HomeChildren/GoodsManager/GoodsList')
const AddGoods=()=>import('@/views/Home/HomeChildren/GoodsManager/AddGoods')

const OrderList=()=>import('@/views/Home/HomeChildren/OrderManager/OrderList')

const Report=()=>import('@/views/Home/HomeChildren/DataStatic/DataReport')
Vue.use(Router)

const routes=[
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/users',
    children:[
      {path:'/users',component:UserInfo},
      {path:'/roles',component:Role},
      {path:'/rights',component:Right},
      {path:'/categories',component:GoodCategory},
      {path:'/params',component:CategoryParameter},
      {path:'/goods',component:GoodsList},
      {path:'/addGoods',component:AddGoods},
      {path:'/orders',component:OrderList},
      {path:'/reports',component:Report}
    ]
  }
]
const router= new Router({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path==="/login") return next()
  const token=window.sessionStorage.getItem("token")
  if(!token)
  {
    next('/login')
  }
  next()
})
export default router