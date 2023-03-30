import myAxios from "../http";
import { myAxios2 } from "../http"
//更新当前用户信息(用户名或邮箱)
export function updateAPI(data) {
    return myAxios2({
        url: "/user/update",
        method: 'post',
        data: data
    })
}
//更新当前用户密码
export function updatepasswordAPI(data) {
    return myAxios2({
        url: "/user/update/password",
        method: 'post',
        data: data
    })
}
//获取当前用户信息(id,用户名,邮箱)
export function userGetAPI() {
    return myAxios2({
        url: "/user/get",
        method: 'get',
    })
}
//获取当前用户的登陆记录
export function getLoginRecordAPI(page, size) {
    return myAxios2({
        url: `/user/getLoginRecord/${page}/${size}`,
        method: 'get',
    })
}