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
            query:Queryparams.query,
            pagenum:Queryparams.pagenum,
            pagesize:Queryparams.pagesize
        }
    })
}
export function putUserStatus(query){
    return request({
        method:'put',
        url:`users/${query.id}/state/${query.status}`
    })
}
export function addUser(user){
    return request({
        method:'post',
        url:"users",
        data:{
            username:user.username,
            password:user.password,
            email:user.email,
            mobile:user.mobile
        }  
    })
}