import myAxios from "../http";

//为当前登录用户创建bucket
export function bucketAPI() {
    return myAxios({
        url: "/bucket",
        method: 'put',
    })
}
//更新bucket信息
export function updateAPI() {
    return myAxios({
        url: "/bucket/update",
        method: 'post',
    })
}
//获取登录用户的所有有权限的bucket
export function listAllAPI() {
    return myAxios({
        url: "/bucket/listAll",
        method: 'post',
    })
}
//获取登录用户的所有bucket
export function listAPI() {
    return myAxios({
        url: "/bucket/list",
        method: 'post',
    })
}
//获取bucket信息
export function getAPI() {
    return myAxios({
        url: "/bucket/get",
        method: 'get',
    })
}
//删除bucket
export function deleteAPI() {
    return myAxios({
        url: "/bucket/delete",
        method: 'delete',
    })
}
