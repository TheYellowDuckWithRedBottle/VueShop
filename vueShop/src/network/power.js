import{request} from './request'

export function getRights(type){
    return request({
        method:'get',
        url:`rights/${type}`
    })
}

export function getRoles(){
    return request({
        method:'get',
        url:`roles`
    })
}


export function deleteRoleRight(roleId,rightId){
    return request({
        method:'delete',
        url:`roles/${roleId}/rights/${rightId}`
    })
}

export function getRightList(type){
    return request({
        method:'get',
        url:`rights/${type}`
    })
}

export function postRightsForUser(roleId,rights){
    return request({
        method:'post',
        url:`roles/${roleId}/rights`,
        data:{
            rids:rights
        }
    })
}
