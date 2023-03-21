import myAxios from "../http";
//用户登录
export function doLoginAPI(data) {
    return myAxios({
        url: "/login/doLogin",
        method: 'post',
        data: data
    })
}
//用户注册
export function registryAPI(data) {
    return myAxios({
        url: "/login/registry",
        method: 'post',
        data: data
    })
}
//用户登出
export function logoutAPI() {
    return myAxios({
        url: "/login/logout",
        method: 'post',

    })
}