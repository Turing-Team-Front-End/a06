import { myAxios2 } from "../http"

export function imageDiffAPI(data) {
  return myAxios2({
    url: "/imageDiff",
    method: "post",
    data
  })
}
