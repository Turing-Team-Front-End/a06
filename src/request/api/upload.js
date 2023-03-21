import myAxios from "../http";

//小文件上传
export function smallFileUploadAPI() {
    return myAxios({
        url: "/upload/smallFileUpload",
        method: 'post',
    })
}

//文件上传任务初始化
export function initMultipartUploadAPI() {
    return myAxios({
        url: "/upload/initMultipartUpload",
        method: 'post',
    })
}
//上传分块
export function uploadChunkAPI() {
    return myAxios({
        url: "/upload/uploadChunk",
        method: 'post',
    })
}
//检查是否可以秒传
export function secUploadAPI() {
    return myAxios({
        url: "/upload/secUpload",
        method: 'post',
    })
}
//检查上传任务已上传块数
export function checkAPI() {
    return myAxios({
        url: "/upload/check",
        method: 'post',
    })
}
//放弃上传任务
export function abortAPI() {
    return myAxios({
        url: "/upload/abort",
        method: 'post',
    })
}

