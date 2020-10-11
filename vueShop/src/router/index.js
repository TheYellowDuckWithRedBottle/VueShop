import Vue from 'vue'
import Router from 'vue-router'

const Login=()=>import ('@/views/Login/Login')

Vue.use(Router)

const routes=[
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  }
]
const router= new Router({
  mode:'history',
  routes
})

export default router