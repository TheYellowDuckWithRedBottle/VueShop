import {request} from './request'

//获取所有的权限
export function getCatesList(query){
    return request({
        method:'get',
        url:'/categories',
        params:{
            type:query.type,
            pagenum:query.pagenum,
            pagesize:query.pagesize
        }
    })
}
export function postCateInfo(CateInfo){
    return request({
        method:'post',
        url:'/categories',
        params:{
            cat_pid:CateInfo.pid,
            cat_name:CateInfo.name,
            cat_level:CateInfo.level
        }
    })
}
export function getGoods(queryString){
    return request({
        method:'get',
        url:'/goods',
        params:{
            query:queryString.query,
            pagenum:queryString.pagenum,
            pagesize:queryString.pagesize

        }
    })
}