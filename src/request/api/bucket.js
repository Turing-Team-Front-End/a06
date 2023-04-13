import myAxios from "../http";
import { myAxios2 } from "../http"
//为当前登录用户创建bucket
export function bucketAPI(data) {
    return myAxios2({
        url: "/bucket",
        method: 'put',
        data
    })
}
//更新bucket信息
export function bucketUpdateAPI(data) {
    return myAxios2({
        url: "/bucket/update",
        method: 'post',
        data
    })
}
//获取登录用户的所有有权限的bucket
export function bucketListAllAPI(page, size) {
    return myAxios2({
        url: `/bucket/listAll/${page}/${size}`,
        method: 'post',
    })
}
//获取登录用户的所有bucket
export function bucketListAPI(page, size) {
    return myAxios2({
        url: `/bucket/list/${page}/${size}`,
        method: 'post',

    })
}
//获取bucket信息
export function bucketGetAPI(data) {
    return myAxios2({
        url: "/bucket/get",
        method: 'get',
        data
    })
}
//删除bucket
export function bucketDeleteAPI(bid) {
    return myAxios2({
        url: `/bucket/delete/${bid}`,
        method: 'delete',
    })
}
//获取bucket总数
export function bucketCountAPI() {
    return myAxios2({
        url: "/bucket/get/count",
        method: 'get',

    })
}
