import {request} from './request'
//获取商品分类
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
//添加商品分类
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
//获取商品参数
export function getCategories(id,type){
    return request({
        method:'get',
        url:`categories/${id}/attributes`,
       params:{
           sel:type
       }
    })
}
//提交商品参数
export function PostParams(id,ParamsInfo){
    return request({
        method:'post',
        url:`categories/${id}/attributes`,
       data:{
        attr_name:ParamsInfo.attr_name,
        attr_sel:ParamsInfo.attr_sel,
        attr_vals:ParamsInfo.attr_vals
       }
    })
}
//获取商品列表
export function GetGoodsList(queryString){
    return request({
        method:'get',
        url:'goods',
       params:{
            query:queryString.query,
            pagesize:queryString.pagesize,
            pagenum:queryString.pagenum
       }
    })
}
export function PostGood(productInfo){
    return request({
        method:'post',
        url:`goods`,
       data:{
        goods_name:productInfo.goods_name,
        goods_price:productInfo.goods_price,
        goods_number:productInfo.goods_number,
        goods_weight:productInfo.goods_weight,
        goods_introduce:productInfo.goods_introduce,
        pics:productInfo.pics,
        attrs:productInfo.attrs
       }
    })
}