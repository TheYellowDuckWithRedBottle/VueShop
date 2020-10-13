import {request} from './request'
export function postUserInfo(userInfo){
    return request({
        method:'post',
        url:'/login',
        params:{
            username:userInfo.username,
            password:userInfo.password
        }
    })
}
export function getUsers(Queryparams){
    return request({
        method:'get',
        url:'users',
        params:{
            pagenum:Queryparams.pagenum,
            pagesize:Queryparams.pagesize
        }
    })
}