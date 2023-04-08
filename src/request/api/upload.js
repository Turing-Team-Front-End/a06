import myAxios from "../http"
import { myAxios2 } from "../http"

//小文件上传
export function smallFileUploadAPI(data) {
  return myAxios2({
    url: `/upload/smallFileUpload`,
    method: "post",
    data
  })
}

//文件上传任务初始化
export function initMultipartUploadAPI(data) {
  return myAxios2({
    url: "/upload/initMultipartUpload",
    method: "post",
    data: data
  })
}
//上传分块
export function uploadChunkAPI(data) {
  return myAxios2({
    url: "/upload/uploadChunk",
    method: "post",
    data: data
  })
}
//检查是否可以秒传
export function secUploadAPI(md5, bid) {
  return myAxios2({
    url: `/upload/secUpload/${md5}/${bid}`,
    method: "post"
  })
}
//检查上传任务已上传块数
export function checkAPI(md5) {
  return myAxios2({
    url: `/upload/check/${md5}`,
    method: "post"
  })
}
//放弃上传任务
export function abortAPI(data) {
  return myAxios2({
    url: "/upload/abort",
    method: "post",
    data
  })
}
