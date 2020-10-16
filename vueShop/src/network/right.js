import {request} from './request'

export function getRightList(type){
    return request({
        method:'get',
        url:`/rights/${type}`
    })
}

export function getRolesList(){
    return request({
        method:'get',
        url:'/roles'
    })
}