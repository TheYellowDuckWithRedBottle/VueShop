import {request} from './request'
export function getSubMenu(){
    return request({
        method:'get',
        url:'/menus'
    })
}