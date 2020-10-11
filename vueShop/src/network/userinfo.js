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