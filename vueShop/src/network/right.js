import {request} from './request'

//获取所有的权限
export function getRightList(type){
    return request({
        method:'get',
        url:`/rights/${type}`
    })
}
//获取所有的角色
export function getRolesList(){
    return request({
        method:'get',
        url:'/roles'
    })
}
//删除某个角色的某个权限
export function deleteRoleRight(roleId,rightId){
    return request({
        method:'delete',
        url:`roles/${roleId}/rights/${rightId}`
    })
}
//为角色添加权限
export function postRoleRight(roleId,rights){
    return request({
        method:'post',
        url:`roles/${roleId}/rights`,
        data:{
            rids:rights
        }
    })
}
//添加角色
export function AddRole(roleInfo){
    return request({
        method:'post',
        url:`roles`,
        data:{
            roleName:roleInfo.roleName,
            roleDesc:roleInfo.roleDesc
        }
    })
}
//删除角色
export function DeleteRole(id){
    return request({
        method:'delete',
        url:`roles/${id}`,
        
    })
}