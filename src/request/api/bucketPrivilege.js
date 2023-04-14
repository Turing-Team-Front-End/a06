import { myAxios2 } from "../http"

//更新授权信息,只可更新权限(需要此bucket所有权)
export function updateBucketPrivilegeAPI(id, privilege) {
  return myAxios2({
    url: `/bucket/privilege/update${id}/${privilege}`,
    method: "post"
  })
}
//设定特定用户特定bucket的读写权限,权限类型只能为r或rw(需要此bucket所有权)
export function setBucketPrivilegeAPI(username, data) {
  return myAxios2({
    url: `/bucket/privilege/set/${username}`,
    method: "post",
    data
  })
}
//获取用户当前所有bucket权限信息(bucketId-权限-isOwner)格式
export function getSimplePrivilegeInfoAPI() {
  return myAxios2({
    url: "/bucket/privilege/getSimplePrivilegeInfo",
    method: "get"
  })
}
//获取指定bucket的授权信息(所有or只读or读写)(需要此bucket所有权)
export function getBucketPrivilegeAPI(bid, page, size) {
  return myAxios2({
    url: `bucket/privilege/getBucketPrivilege/${bid}/${page}/${size}`,
    method: "get"
  })
}
//获取当前用户所有的bucket权限信息
export function bucketPrivilegeGetAllAPI() {
  return myAxios2({
    url: "/bucket/privilege/getAll",
    method: "get"
  })
}
//删除指定权限信息(需要此bucket所有权)
export function bucketPrivilegeDeleteAPI(data) {
  return myAxios2({
    url: "/bucket/privilege/delete",
    method: "delete",
    data
  })
}
