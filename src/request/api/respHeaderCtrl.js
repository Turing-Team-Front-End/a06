import { myAxios2 } from "../http"

export function updateResponseHeaderAPI(data) {
  return myAxios2({
    url: "/respHeaderCtrl/update",
    method: "post",
    data
  })
}

export function addResponseHeaderAPI(data) {
  return myAxios2({
    url: "/respHeaderCtrl/add",
    method: "post",
    data
  })
}
export function getAllResponseHeaderAPI(data) {
  return myAxios2({
    url: "/respHeaderCtrl/getAll",
    method: "get",
    params: data
  })
}
export function deleteResponseHeaderAPI(data) {
  return myAxios2({
    url: "/respHeaderCtrl/delete",
    method: "delete",
    data
  })
}
