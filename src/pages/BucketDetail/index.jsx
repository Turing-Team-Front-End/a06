import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import BucketTable from "../../components/bucketTable"
import Popover from "../../components/popover"
import FileDetail from "../../components/fileDetail"
import FileUpload from "../../components/fileUpload"
import ShareFile from "../../components/shareFile"
import DeleteWarning from "../../components/deleteWarning"
import { filesListallAPI, downloadAPI } from "../../request/api/files"
import { Button, Input, Space, Spin, Pagination, message } from "antd"
import {
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined
} from "@ant-design/icons"
import arrowLeft from "../../assets/arrow-left.svg"
import "./index.css"
export default function BucketDetail() {
  const params = useParams()
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
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
    // console.log(params.privilege, 5555555555555)
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
          borderRadius: "8px 0 0 8px",
          borderColor: "#dde1ff"
        }
      }),
      onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
      title: "文件大小",
      dataIndex: "fileSize",
      key: "fileSize",
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

          {/* <Button
            icon={<DownloadOutlined />}
            className='bucket-detail-mid-left-download'
            type='text'
          ></Button> */}
          {/* <Button className='bucket-detail-mid-left-delete' type='text'>
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='1393'
              width='20'
              height='20'
            >
              <path
                d='M723.2 204.8V102.4C723.2 44.8 672 0 614.4 0H409.6C352 0 300.8 44.8 300.8 102.4v102.4H96v102.4h51.2v563.2c0 83.2 70.4 153.6 153.6 153.6h416c83.2 0 153.6-70.4 153.6-153.6V307.2h57.6V204.8H723.2zM409.6 102.4h204.8v102.4H409.6V102.4z m364.8 768c0 25.6-25.6 51.2-51.2 51.2H300.8c-25.6 0-51.2-25.6-51.2-51.2V307.2h518.4v563.2h6.4z'
                fill='currentColor'
                p-id='1394'
              ></path>
              <path
                d='M358.4 409.6h102.4v409.6H358.4zM563.2 409.6h102.4v409.6H563.2z'
                fill='currentColor'
                p-id='1395'
              ></path>
            </svg>
          </Button> */}
          {/* <div className='bucket-detail-mid-left-selected'>0个已选中</div> */}
        </div>
        {/* <Input
          className='bucket-detail-mid-right-input'
          placeholder='搜索文件...'
          prefix={
            <SearchOutlined className='bucket-detail-mid-right-input-svg' />
          }
        ></Input> */}
      </div>
      <div className='bucket-detail-bottom'>
        <Spin tip='Loading' spinning={isLoading}>
          <BucketTable columns={columns} data={data} />
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
            style={{ position: "bottomCenter" }}
          />
        </Spin>
      </div>
    </div>
  )
}
