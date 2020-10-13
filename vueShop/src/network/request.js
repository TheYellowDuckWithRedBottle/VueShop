import axios from 'axios'

export function request(config){
    const instance=axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1",
        timeout:5000,
    
    })
    
    instance.interceptors.request.use(config=>{
        config.headers.Authorization=window.sessionStorage.getItem("token")
        // console.log(config)
        return config
    },err=>{
        console.log(err)
    })

    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
    })

    return instance(config)
}