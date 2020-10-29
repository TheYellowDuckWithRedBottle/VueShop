import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
export function request(config){
    const instance=axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1",
        timeout:5000,
    
    })
    
    instance.interceptors.request.use(config=>{
        config.headers.Authorization=window.sessionStorage.getItem("token")
        NProgress.start()
        return config
    },err=>{
        console.log(err)
    })

    instance.interceptors.response.use(res=>{
        nProgress.done()
        return res.data
    },err=>{
        console.log(err)
    })

    return instance(config)
}