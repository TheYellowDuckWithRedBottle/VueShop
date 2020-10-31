import {request} from './request'
export function getOrderList(queryString){
    return request({
        method:'get',
        url:'/orders',
        params:{
            query:queryString.query,
            pagenum:queryString.pagenum,
            pagesize:queryString.pagesize,
            user_id:queryString.user_id,
            pay_status:queryString.pay_status,
            is_send:queryString.is_send,
            order_fapiao_title:queryString.order_fapiao_title,
            order_fapiao_company:queryString.order_fapiao_company,
            order_fapiao_content:queryString.order_fapiao_content,
            consignee_addr:queryString.consignee_addr
            
        }
    })
}
