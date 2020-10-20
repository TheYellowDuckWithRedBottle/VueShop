import {request} from './request'

//获取所有的权限
export function getGoodsList(query){
    return request({
        method:'get',
        url:`/categories`,
        params:{
            type:query.type,
            pagenum:query.pagenum,
            pagesize:query.pagesize
        }
    })
}