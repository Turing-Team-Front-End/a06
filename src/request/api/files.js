import { myAxios2 } from "../http"

//文件下载
export function downloadAPI(filename, bid) {
  return myAxios2({
    url: `/download/${filename}?bid=${bid}`,
    method: "get",
    responseType: "blob"
  })
}
//删除文件
export function filesDeleteAPI(bid, id) {
  return myAxios2({
    url: `/files/delete/${bid}/${id}`,
    method: "delete"
  })
}
//获取bucket下所有文件
export function filesListallAPI(bid, page, size) {
  return myAxios2({
    url: `/files/listall/${bid}/${page}/${size}`,
    method: "get"
  })
}
//分享文件链接
export function shareFileAPI(data) {
  return myAxios2({
    url: `/share/generateSharePath`,
    method: "get",
    params: data
  })
}
