import Vue from 'vue'
import Router from 'vue-router'

const Login=()=>import ('@/views/Login/Login')
const Home=()=>import ('@/views/Home/Home')
const userInfo=()=>import('@/views/Home/HomeChild/UserInfo')

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