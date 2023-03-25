import myAxios from "../http";

//更新授权信息,只可更新权限(需要此bucket所有权)
export function bucketPrivilegeUpdateAPI(data) {
    return myAxios({
        url: "/bucket/privilege/update",
        method: 'post',
        data: data
    })
}
//设定特定用户特定bucket的读写权限,权限类型只能为r或rw(需要此bucket所有权)
export function bucketPrivilegeSetAPI(data) {
    return myAxios({
        url: "/bucket/privilege/set",
        method: 'post',
        params: data
    })
}
//获取用户当前所有bucket权限信息(bucketId-权限-isOwner)格式
export function getSimplePrivilegeInfoAPI() {
    return myAxios({
        url: "/bucket/privilege/getSimplePrivilegeInfo",
        method: 'get',

    })
}
//获取指定bucket的授权信息(所有or只读or读写)(需要此bucket所有权)
export function getBucketPrivilegeAPI(data) {
    return myAxios({
        url: "/bucket/privilege/getBucketPrivilege",
        method: 'get',
        data: data
    })
}
//获取当前用户所有的bucket权限信息
export function bucketPrivilegeGetAllAPI() {
    return myAxios({
        url: "/bucket/privilege/getAll",
        method: 'get',

    })
}
//删除指定权限信息(需要此bucket所有权)
export function bucketPrivilegeDeleteAPI(data) {
    return myAxios({
        url: "/bucket/privilege/delete",
        method: 'delete',
        data: data
    })
}
