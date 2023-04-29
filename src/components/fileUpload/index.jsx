import React, { useEffect, useState } from "react"
import "./index.css"
import DeleteWarning from "../deleteWarning"
import CompressionSite from "../compressionSite"
import UploadList from "../uploadList"
import Popover from "../popover"
import { Button, Space, Upload, message } from "antd"
import {
  smallFileUploadAPI,
  secUploadAPI,
  initMultipartUploadAPI,
  uploadChunkAPI,
  checkAPI,
  abortAPI
} from "../../request/api/upload"
import SparkMD5 from "spark-md5"

function fileUpload(props) {
  const [uploadData, setUploadData] = useState([])
  useEffect(() => {
    console.log(uploadData)
  }, [uploadData])

  const test = () => {
    const x = [
      ...uploadData,
      {
        name: "111",
        percent: 0
      }
    ]
    setUploadData(x)
  }
  function handleDataUpdate(updatedData) {
    console.log(updatedData)
    setUploadData(updatedData)
  }
  const checkSecUpload = (file) => {
    var fileReader = new FileReader()
    var md5 = ""
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      md5 = SparkMD5.hashBinary(e.target.result)
      const x = [
        ...uploadData,
        {
          name: file.name,
          percent: 0,
          md5: md5
        }
      ]
      setUploadData(x)
      secUploadAPI(md5, props.bid).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data === true) {
            const updatedData = x.map((item) => {
              if (item.name === file.name) {
                return {
                  ...item,
                  percent: 100
                }
              }
              return item
            })
            setUploadData(updatedData)
            message.success("上传成功！")
          } else {
            checkSize(file)
          }
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
        }
      })
    }
    data.append("md5", md5)
    data.append("bid", props.bid)
    secUploadAPI(data).then((res) => {
      if (res.data.code === 200) {
        message.success("上传成功！")
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
      }
    })
  }
  const checkSize = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      toUploadLargeFile(file)
    } else toUpload(file)
  }
  const fileToMd5 = async (file) => {
    var fileReader = new FileReader()
    var md5 = ""
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      md5 = SparkMD5.hashBinary(e.target.result)
      const x = [
        ...uploadData,
        {
          name: file.name,
          percent: 0,
          md5: md5
        }
      ]
      setUploadData(x)
      let data = new FormData()
      data.append("bid", props.bid)
      data.append("md5", md5)
      data.append("file", file)
      const config = {
        onUploadProgress: (progressEvent) => {
          const progressPercent = Number(
            ((progressEvent.loaded / progressEvent.total) * 100).toFixed(1)
          )
          const updatedData = x.map((item) => {
            if (item.name === file.name) {
              return {
                ...item,
                percent: progressPercent
              }
            }
            return item
          })
          setUploadData(updatedData)
        }
      }

      smallFileUploadAPI(data, config).then((res) => {
        if (res.data.code === 200) {
          message.success("上传成功！")
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
          const updatedData = x.map((item) => {
            if (item.name === file.name) {
              return {
                ...item,
                exception: true
              }
            }
            return item
          })
          setUploadData(updatedData)
        }
      })
    }
  }
  const checkChunksNum = (md5) => {
    checkAPI(md5).then((res) => {
      console.log(res)
      // console.log(res.data.data.length)
      if (res.data.code === 200) {
        // return res.data.data.length
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
      }
    })
  }
  const toUploadLargeFile = (file) => {
    let chunkSize = 10 * 1024 * 1024
    let chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 1
    let fileReader = new FileReader()
    var md5 = ""
    fileReader.readAsBinaryString(file)

    fileReader.onload = (e) => {
      md5 = SparkMD5.hashBinary(e.target.result)
      const x = [
        ...uploadData,
        {
          name: file.name,
          percent: 0,
          md5: md5
        }
      ]
      setUploadData(x)
      console.log(x)
      console.log(uploadData)
      let data = new FormData()
      data.append("bid", props.bid)
      data.append("chunks", chunks)
      data.append("size", file.size)
      data.append("name", file.name)
      data.append("md5", md5)
      initMultipartUploadAPI(data).then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
          if (res.data.data === true) {
            message.success("初始化成功！")
            toUploadChunk(
              props.bid,
              chunks,
              currentChunk,
              file.size,
              file.name,
              md5,
              file
            )
          }
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
          toAbortUploadLargeFile(md5)
        }
      })
    }
  }
  const toUploadChunk = (bid, chunks, currentChunk, size, name, md5, file) => {
    let blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice
    let chunkSize = 10 * 1024 * 1024
    let start = (currentChunk - 1) * chunkSize
    let end = start + chunkSize >= file.size ? file.size : start + chunkSize
    let temporaryBlob = blobSlice.call(file, start, end)
    let temporaryFile = new File([temporaryBlob], name, {
      type: file.type
    })
    // console.log(temporaryFile)
    let data = new FormData()
    data.append("bid", bid)
    data.append("chunks", chunks)
    data.append("chunk", currentChunk)
    data.append("size", size)
    data.append("name", name)
    data.append("md5", md5)
    data.append("file", temporaryFile)
    uploadChunkAPI(data).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        if (currentChunk < chunks) {
          toUploadChunk(bid, chunks, currentChunk + 1, size, name, md5, file)
          const progressPercent = (
            Number(res.data.data.length / chunks) * 100
          ).toFixed(1)
          setUploadData((prevState) =>
            prevState.map((item) => {
              if (item.name === name) {
                return {
                  ...item,
                  percent: progressPercent
                }
              }
              return item
            })
          )
        } else {
          setUploadData((prevState) =>
            prevState.map((item) => {
              if (item.name === name) {
                return {
                  ...item,
                  percent: 100
                }
              }
              return item
            })
          )
          // checkChunksNum(md5)
        }
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
      }
    })
  }
  const toAbortUploadLargeFile = (md5) => {
    const x = [...uploadData]
    setUploadData((prevState) =>
      prevState.map((item) => {
        if (item.md5 === md5) {
          return {
            ...item,
            exception: true
          }
        }
        return item
      })
    )
    abortAPI(md5).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        message.info("上传已取消！")
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
      }
    })
  }
  const toUpload = (file) => {
    fileToMd5(file)
    return false //拦截组件默认的请求
  }
  return (
    <>
      <div className='fileUpload'>
        <div className='fileUpload-content'>
          <div className='fileUpload-content-main'>
            <UploadList data={uploadData} onDataUpdate={handleDataUpdate} />
          </div>
          <div className='fileUpload-content-foot'>
            {/* <Button className='fileUpload-content-foot-btn' onClick={test}>
              取消
            </Button> */}
            <Popover
              name='压缩设置'
              button={false}
              mode={
                <Button
                  type='text'
                  className='fileUpload-content-foot-right-btn'
                >
                  压缩设置
                </Button>
              }
              content={<CompressionSite />}
            />
            <div className='fileUpload-content-foot-right'>
              <Upload
                beforeUpload={(file) => {
                  checkSecUpload(file)
                }}
                showUploadList={false}
              >
                <Button
                  type='text'
                  className='fileUpload-content-foot-right-btn'
                >
                  上传文件
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default fileUpload
