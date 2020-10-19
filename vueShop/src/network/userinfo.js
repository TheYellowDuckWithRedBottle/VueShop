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

export function updateUser(user){
    return request({
        method:'put',
        url:`users/${user.id}`,
        data:{
           mobile:user.mobile,
           email:user.email
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
export function getUser(id){
    return request({
        method:'get',
        url:`users/${id}`
    })
}
export function deletUser(id){
    return request({
        method:'delete',
        url:`users/${id}`
    })
}
export function putRoleForUser(id,rid){
    return request({
        method:'put',
        url:`users/${id}/role`,
        data:{
            rid:rid
        }
    })
}