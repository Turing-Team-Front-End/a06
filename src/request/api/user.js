import myAxios from "../http";

//更新当前用户信息(用户名或邮箱)
export function updateAPI() {
    return myAxios({
        url: "/user/update",
        method: 'post',
    })
}
//更新当前用户密码
export function updatepasswordAPI() {
    return myAxios({
        url: "/user/update/password",
        method: 'post',
    })
}
//获取当前用户信息(id,用户名,邮箱)
export function userGetAPI() {
    return myAxios({
        url: "/user/get",
        method: 'get',
    })
}
//获取当前用户的登陆记录
export function getLoginRecordAPI() {
    return myAxios({
        url: "/user/getLoginRecord",
        method: 'get',
    })
}