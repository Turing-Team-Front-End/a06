import myAxios from "../http";

//文件下载
export function downloadAPI(data) {
    return myAxios({
        url: "/download",
        method: 'get',
        data: data
    })
}
//删除文件
export function filesDeleteAPI(data) {
    return myAxios({
        url: "/files/delete",
        method: 'delete',
        data: data
    })
}