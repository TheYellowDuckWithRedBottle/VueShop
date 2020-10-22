import {request} from './request'

export function getGoodsCategory(query){
    return request({
        method:'get',
        url:'categories',
        params:{
            type:query.type,
            pagenum:query.pagenum,
            pagesize:query.pagesize
        }
    })
}
export function addCategory(cateInfo){
    return request({
        method:'post',
        url:'categories',
        data:{
            cat_pid:cateInfo.pid,
            cat_name:cateInfo.name,
            cat_level:cateInfo.level
        }
    })
}

export function getCategories(id,type){
    return request({
        method:'get',
        url:`categories/${id}/attributes`,
       params:{
           sel:type
       }
    })
}