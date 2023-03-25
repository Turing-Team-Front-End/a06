import myAxios from "../http";

//为当前登录用户创建bucket
export function bucketAPI(data) {
    return myAxios({
        url: "/bucket",
        method: 'put',
        data: data
    })
}
//更新bucket信息
export function bucketUpdateAPI(data) {
    return myAxios({
        url: "/bucket/update",
        method: 'post',
        data: data
    })
}
//获取登录用户的所有有权限的bucket
export function bucketListAllAPI(data) {
    return myAxios({
        url: "/bucket/listAll",
        method: 'post',
        data: data
    })
}
//获取登录用户的所有bucket
export function bucketListAPI(data) {
    return myAxios({
        url: "/bucket/list",
        method: 'post',
        data: data
    })
}
//获取bucket信息
export function bucketGetAPI(data) {
    return myAxios({
        url: "/bucket/get",
        method: 'get',
        data: data
    })
}
//删除bucket
export function bucketDeleteAPI(data) {
    return myAxios({
        url: "/bucket/delete",
        method: 'delete',
        data: data
    })
}
