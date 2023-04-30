import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import BucketTable from "../../components/bucketTableForDetail"
import Popover from "../../components/popover"
import FileUpload from "../../components/fileUpload"
import ShareFile from "../../components/shareFile"
import DeleteWarning from "../../components/deleteWarning"
import { filesListallAPI, downloadAPI } from "../../request/api/files"
import { imageDiffAPI } from "../../request/api/extra"
import { shareFileAPI } from "../../request/api/files"
import { Button, Space, Spin, Pagination, message, Progress } from "antd"
import { SearchOutlined, UploadOutlined } from "@ant-design/icons"
import arrowLeft from "../../assets/arrow-left.svg"
import "./index.css"
export default function BucketDetail() {
  const params = useParams()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFileArray, setSelectedFileArray] = useState([])
  const [selectedFileName, setSelectedFileName] = useState([])
  const [diffPercent, setDiffPercent] = useState(0)
  const [src1, setSrc1] = useState("")
  const [src2, setSrc2] = useState("")
  const selectedFileChange = (selectedFileArray) => {
    // console.log(selectedFileArray)
    setSelectedFileArray(selectedFileArray)
  }
  const showName = (name) => {
    // console.log(name)
    setSelectedFileName(name)
  }
  const getFilesData = async () => {
    try {
      let res = await filesListallAPI(params.bid, current, pageSize)
      // console.log(res, 114514)
      setData(res.data.data.records)
      setTotal(res.data.data.total)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const toImageDiff = async () => {
    if (selectedFileArray.length !== 2) {
      message.error("请选择两个图片类型文件进行比对")
      return
    }
    try {
      let res = await imageDiffAPI([selectedFileArray[0], selectedFileArray[1]])
      console.log(res)
      if (res.data.data.length === 0) {
        setDiffPercent(0)
        setSrc1("")
        setSrc2("")
        message.success("图片相似度为0")
      } else {
        message.success(
          "图片相似度为" +
            (res.data.data[0].similarity * 100).toFixed(2) +
            "%" +
            ",点击左侧按钮查看详情"
        )
        setDiffPercent((res.data.data[0].similarity * 100).toFixed(2))
        let data = {
          bid: params.bid,
          expire: 5,
          fileId: res.data.data[0].id1
        }
        try {
          let res = await shareFileAPI(data)
          console.log(res)
          if (res.data.code === 200) {
            setSrc1(res.data.data)
          } else if (res.data.code === 500) {
            message.error(res.data.msg)
          }
        } catch (error) {
          console.error(error)
        }
        data = {
          bid: params.bid,
          expire: 5,
          fileId: res.data.data[0].id2
        }
        try {
          let res = await shareFileAPI(data)
          console.log(res)
          if (res.data.code === 200) {
            setSrc2(res.data.data)
          } else if (res.data.code === 500) {
            message.error(res.data.msg)
          }
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const changePage = (page) => {
    setCurrent(page)
  }
  const download = async (record) => {
    let loadingMessage = null
    try {
      loadingMessage = message.loading("正在下载...", 0)

      let res = await downloadAPI(record.fileName, record.bid)
      console.log(res)
      const { data } = res
      let blob = new Blob([data], { type: data.type })
      let downloadElement = document.createElement("a")
      let href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = record.fileName
      downloadElement.style.display = "none"
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
      setTimeout(() => {
        if (loadingMessage) {
          loadingMessage()
          loadingMessage = null
          message.success("下载成功", 3)
        }
      }, 0)
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        if (loadingMessage) {
          loadingMessage()
          loadingMessage = null
          message.error(`下载失败: ${error}`, 3)
        }
      }, 0)
    }
  }
  useEffect(() => {
    getFilesData()
  }, [current])

  const columns = [
    {
      title: "文件名",
      dataIndex: "fileName",
      key: "fileName",
      width: "calc(25vw - 43px)",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B",
          // borderRadius: "8px 0 0 8px",
          borderColor: "#dde1ff"
        }
      })
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "calc(23vw - 43px)",
      align: "center",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      }),
      render: (text, record, index) => {
        return text.replace("T", "  ")
      }
    },
    {
      title: "文件大小",
      dataIndex: "fileSize",
      key: "fileSize",
      width: "calc(23vw - 43px)",
      align: "center",

      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      }),
      render: (text, record, index) => {
        let bytes = Number(text)
        if (bytes === 0) return "0 Bytes"

        const k = 1024
        const dm = 2
        const sizes = ["字节", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
      }
    },
    {
      title: "操作",
      key: "operation",
      width: "calc(23vw - 43px)",
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
      render: (text, record, index) => (
        <Space size='middle'>
          {/* <Popover
            name='文件详情'
            button={false}
            record={record}
            mode={<a style={{ color: "#3452CE" }}>详情</a>}
            content={<FileDetail />}
          /> */}
          <Popover
            name='分享链接'
            button={false}
            mode={<a style={{ color: "#3452CE" }}>链接</a>}
            content={<ShareFile record={record} />}
          />
          <a style={{ color: "#3452CE" }} onClick={() => download(record)}>
            下载
          </a>
          {params.privilege === "rw" ? (
            <DeleteWarning
              name='提示'
              button={false}
              record={record}
              mode={<a style={{ color: "#BA1A1A" }}>删除</a>}
            />
          ) : null}
        </Space>
      )
    }
  ]
  return (
    <div className='bucket-detail'>
      <div className='bucket-detail-top'>
        <div className='bucket-detail-top-back'>
          <Link to='/home/bucket/main'>
            <img src={arrowLeft} alt='' />
          </Link>
        </div>
        <div className='bucket-detail-top-name'>Bucket</div>
        <div className='bucket-detail-top-line'>/</div>
        <div className='bucket-detail-top-detail'>{params.name}</div>
      </div>
      <div className='bucket-detail-mid'>
        <div className='bucket-detail-mid-left'>
          {params.privilege === "rw" ? (
            <Popover
              name='上传文件'
              button={false}
              mode={
                <Button
                  icon={<UploadOutlined />}
                  className='bucket-detail-mid-left-upload'
                  type='text'
                >
                  上传文件
                </Button>
              }
              content={<FileUpload bid={params.bid} />}
            />
          ) : (
            ""
          )}
        </div>
        <div className='bucket-detail-mid-right'>
          <Popover
            name='图片查重结果'
            button={false}
            mode={
              <Button
                style={{
                  color: "#3452CE",
                  display: src1 !== "" && src2 !== "" ? "block" : "none"
                }}
              >
                查看
              </Button>
            }
            content={
              <div className='diff'>
                <div className='diff-left'>
                  <p>图片一</p>
                  <img className='img1' src={src1} />
                </div>
                <div className='diff-mid'>
                  <p>相似度</p>
                  <Progress
                    type='dashboard'
                    percent={diffPercent}
                    gapDegree={30}
                  />
                </div>
                <div className='diff-right'>
                  <p>图片二</p>
                  <img className='img2' src={src2} />
                </div>
              </div>
            }
          />
          <Button
            icon={<SearchOutlined />}
            className='bucket-detail-mid-left-download'
            type='text'
            onClick={() => toImageDiff()}
          >
            图片查重
          </Button>
          {/* <div className='bucket-selected-file-name'>
            <p>{selectedFileName[0] ? `${selectedFileName[0]}` : ""}</p>
            <p>{selectedFileName[1] ? `${selectedFileName[1]}` : ""}</p>
          </div> */}

          <div className='bucket-detail-mid-left-selected'>
            {selectedFileArray.length}个已选中
          </div>
          {/* <Input
          className='bucket-detail-mid-right-input'
          placeholder='搜索文件...'
          prefix={
            <SearchOutlined className='bucket-detail-mid-right-input-svg' />
          }
        ></Input> */}
        </div>
      </div>

      <div className='bucket-detail-bottom'>
        <Spin tip='Loading' spinning={isLoading}>
          <BucketTable
            columns={columns}
            data={data}
            onSelectedFileChange={selectedFileChange}
            showName={showName}
          />
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
            showSizeChanger={false}
            style={{ position: "bottomCenter" }}
          />
        </Spin>
      </div>
    </div>
  )
}
