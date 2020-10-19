import Vue from 'vue'
import Router from 'vue-router'

const Login=()=>import ('@/views/Login/Login')
const Home=()=>import('@/views/Home/Home')
const UserInfo=()=>import('@/views/Home/HomeChildren/userInfo')

const Role=()=>import('@/views/Home/HomeChildren/PowerManager/RoleCom')
const Right=()=>import('@/views/Home/HomeChildren/PowerManager/RightCom')
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