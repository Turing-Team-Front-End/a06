import myAxios2 from "../http";

//文件下载
export function downloadAPI(filename, bid) {
    return myAxios2({
        url: `/download/${filename}?bid=${bid}`,
        method: 'get',
        headers: {
            token: window.sessionStorage.getItem("token")
        }
    })
}
//删除文件
export function filesDeleteAPI(bid, id) {
    return myAxios2({
        url: `/files/delete/${bid}/${id}`,
        method: 'delete',
        headers: {
            token: window.sessionStorage.getItem("token")
        }
    })
}
//获取bucket下所有文件
export function filesListallAPI(bid, page, size) {
    return myAxios2({
        url: `/files/listall/${bid}/${page}/${size}`,
        method: 'get',
        headers: {
            token: window.sessionStorage.getItem("token")
        }
    })
}
//分享文件链接
export function shareFileAPI(data) {
    return myAxios2({
        url: `/share/generateSharePath`,
        method: 'get',
        data,
        headers: {
            token: window.sessionStorage.getItem("token")
        }

    })
}