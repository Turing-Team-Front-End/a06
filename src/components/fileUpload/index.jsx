import React, { useEffect, useState } from "react"
import "./index.css"
import BucketTable from "../bucketTable"
import DeleteWarning from "../deleteWarning"
import CompressionSite from "../compressionSite"
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
  useEffect(() => {})
  const checkSecUpload = (file) => {
    var fileReader = new FileReader()
    var md5 = ""
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      md5 = SparkMD5.hashBinary(e.target.result)
      secUploadAPI(md5, props.bid).then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
          if (res.data.data === true) {
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
    console.log(file)
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      md5 = SparkMD5.hashBinary(e.target.result)
      let data = new FormData()
      data.append("bid", props.bid)
      data.append("md5", md5)
      data.append("file", file)
      smallFileUploadAPI(data).then((res) => {
        if (res.data.code === 200) {
          message.success("上传成功！")
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
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
        } else {
          checkChunksNum(md5)
          // toAbortUploadLargeFile(md5)
        }
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
        // toAbortUploadLargeFile(md5)
      }
    })
  }
  const toAbortUploadLargeFile = (md5) => {
    abortAPI(md5).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        message.success("上传已取消！")
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
      }
    })
  }
  const toUpload = (file) => {
    fileToMd5(file)
    return false //拦截组件默认的请求
  }
  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
      width: "calc(25vw - 43px)",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B",
          borderRadius: "8px 0 0 8px",
          borderColor: "#dde1ff"
        }
      }),
      onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
      width: "calc(25vw - 43px)",
      align: "center",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      }),
      onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: "calc(25vw - 43px)",
      align: "center",

      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      }),
      onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      width: "calc(25vw - 43px)",
      align: "center",

      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      }),
      onCell: () => ({
        style: { backgroundColor: "#f4f5fb", color: "#3452CE" }
      })
    },
    {
      title: "操作",
      key: "operation",
      width: "calc(25vw - 43px)",
      align: "center",

      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B",
          borderRadius: "0 8px 8px 0"
        }
      }),
      onCell: () => ({ style: { backgroundColor: "#f4f5fb" } }),
      render: (text, record, index) => (
        <Space size='middle'>
          <DeleteWarning
            name='提示'
            button={false}
            mode={<a style={{ color: "#BA1A1A" }}>删除</a>}
          />
        </Space>
      )
    }
  ]
  const data = [
    {
      key: "1",
      name: "1111.jpg",
      size: "22KB",
      type: "JPG",
      state: "已扫描"
    },
    {
      key: "2",
      name: "1111.jpg",
      size: "22KB",
      type: "JPG",
      state: "已扫描"
    },
    {
      key: "3",
      name: "1111.jpg",
      size: "22KB",
      type: "JPG",
      state: "已扫描"
    }
  ]
  return (
    <>
      <div className='fileUpload'>
        <div className='fileUpload-top'>
          <div className='fileUpload-top-main'>
            <Button type='text' className='fileUpload-top-main-btn'>
              当前目录
            </Button>
            <div className='fileUpload-top-data'>11111</div>
          </div>
        </div>
        <div className='fileUpload-content'>
          <div className='fileUpload-content-top'>
            <Button type='text' className='fileUpload-content-top-btn'>
              选择文件
            </Button>
          </div>
          <div className='fileUpload-content-main'>
            <BucketTable columns={columns} data={data} />
          </div>
          <div className='fileUpload-content-foot'>
            <Button className='fileUpload-content-foot-btn'>取消</Button>
            <div className='fileUpload-content-foot-right'>
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
