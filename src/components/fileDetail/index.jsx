import React, { useEffect, useState } from "react"
import { Button, Image, Space } from "antd"
import nijika from "../../assets/Nijika.jpg"

import "./index.css"

function fileDetail(props) {
  const [random, setRandom] = useState()
  useEffect(() => {
    // console.log(props)
  })
  return (
    <>
      <div className='file-detail'>
        <Image className='file-img' width={"50%"} src={nijika} />
        <div className='file-content'>
          <div>
            <strong>文件名</strong> <p>11111111111.JGP</p>
          </div>
          <div>
            <strong>文件大小</strong> <p>32MB</p>
          </div>
          <div>
            <strong>上传时间</strong> <p>2023.02.02 12:07:21 </p>
          </div>
          <div>
            <strong>文件链接</strong>{" "}
            <div className='file-box'>
              <a>
                https://s3-us-east-1.ossfiles.com/bucket01/001/20220528_125530.bmp?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2af37a1c7226ca4a96c29ac37a76728d%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230130T132510Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=5f1e1d63d2377d86093fcad37db3849c91192855cf5f96133ce24df343bd114514d5fd
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default fileDetail
