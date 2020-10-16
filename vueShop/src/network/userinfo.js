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

export function getUsers(queryString){
    return request({
        method:'get',
        url:'/users',
        params:{
            pagenum:queryString.pagenum,
            pagesize:queryString.pagesize,
            query:queryString.query
        }

    })
}
export function putUser(user){
    return request({
        method:'put',
        url:`users/${user.id}`,
        data:{
            email:user.email,
            mobile:user.mobile
        }
    })
}
export function putUserStaus(userstatus){
    return request({
        method:'put',
        url:`users/${userstatus.id}/state/${userstatus.status}`
       
    })
}
export function postUser(user){
    return request({
        method:'post',
        url:'/users',
        data:{
            username:user.username,
            password:user.password,
            email:user.email,
            mobile:user.mobile
        }
        }
    )

}
export function deleteUser(id){
    return request({
        method:'delete',
        url:`/users/${id}`
    })
}