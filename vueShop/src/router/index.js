import Vue from 'vue'
import Router from 'vue-router'

const Login=()=>import ('@/views/Login/Login')
const Home=()=>import ('@/views/Home/Home')
const userInfo=()=>import('@/views/Home/HomeChild/UserInfo')

const Role=()=>import('@/views/Home/HomeChild/RightManager/RoleCom')
const Right=()=>import('@/views/Home/HomeChild/RightManager/RightCom')


const GoodsCate=()=>import('@/views/Home/HomeChild/GoodsManager/GoodsCate')
const GoodsList=()=>import('@/views/Home/HomeChild/GoodsManager/GoodsList')
const GoodsParams=()=>import('@/views/Home/HomeChild/GoodsManager/GoodsParams')

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
    redirect: '/users',
    children:[
      {
        path:'/users',
        component:userInfo
      },{
        path:'/roles',
        component:Role
      },{
        path:'/rights',
        component:Right
      },
      {
        path:'/categories',
        component:GoodsCate
      },
      {
        path:'/goods',
        component:GoodsList
      },{
        path:'/params',
        component:GoodsParams
      }
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
  if(!token) return next('/login')
  else{ next()}
})
export default router