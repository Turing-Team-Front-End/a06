import myAxios from "../http";

//小文件上传
export function smallFileUploadAPI(data) {
    return myAxios({
        url: "/upload/smallFileUpload",
        method: 'post',
        data: data
    })
}

//文件上传任务初始化
export function initMultipartUploadAPI(data) {
    return myAxios({
        url: "/upload/initMultipartUpload",
        method: 'post',
        data: data
    })
}
//上传分块
export function uploadChunkAPI(data) {
    return myAxios({
        url: "/upload/uploadChunk",
        method: 'post',
        data: data
    })
}
//检查是否可以秒传
export function secUploadAPI(data) {
    return myAxios({
        url: "/upload/secUpload",
        method: 'post',
        data: data
    })
}
//检查上传任务已上传块数
export function checkAPI(data) {
    return myAxios({
        url: "/upload/check",
        method: 'post',
        data: data
    })
}
//放弃上传任务
export function abortAPI(data) {
    return myAxios({
        url: "/upload/abort",
        method: 'post',
        data: data
    })
}

