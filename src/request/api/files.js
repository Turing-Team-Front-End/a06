import myAxios from "../http";

//文件下载
export function downloadAPI() {
    return myAxios({
        url: "/download",
        method: 'get',
    })
}
//删除文件
export function filesDeleteAPI() {
    return myAxios({
        url: "/files/delete",
        method: 'delete',
    })
}