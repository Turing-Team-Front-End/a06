import { myAxios2 } from "../http"

export function updateResponseHeader(data) {
  return myAxios2({
    url: "/respHeaderCtrl/update",
    method: "post",
    data
  })
}

export function addResponseHeader(data) {
  return myAxios2({
    url: "/respHeaderCtrl/add",
    method: "post",
    data
  })
}
export function getAllResponseHeader(data) {
  return myAxios2({
    url: "/respHeaderCtrl/getAll",
    method: "get",
    params: data
  })
}
export function deleteResponseHeader(data) {
  return myAxios2({
    url: "/respHeaderCtrl/delete",
    method: "delete",
    data
  })
}
