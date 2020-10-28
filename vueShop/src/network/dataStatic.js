import {request} from './request'
//获取商品分类
export function getReport(){
    return request({
        method:'get',
        url:'reports/type/1',
   
    })

}
