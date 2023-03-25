import React, { useEffect, useState } from "react"
import "./index.css"
import BucketTable from "../bucketTable"
import DeleteWarning from "../deleteWarning"
import CompressionSite from "../compressionSite"
import Popover from "../popover"
import { Button, Space } from "antd"
function fileUpload(props) {
  useEffect(() => {
    console.log(props)
  })
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
    }, {
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
      onCell: () => ({ style: { backgroundColor: "#f4f5fb", color: '#3452CE' } })
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
  return <>
    <div className="fileUpload">
      <div className="fileUpload-top">
        <div className="fileUpload-top-main">
          <Button type='text' className="fileUpload-top-main-btn">当前目录</Button>
          <div className="fileUpload-top-data">11111</div>
        </div>
      </div>
      <div className="fileUpload-content">
        <div className="fileUpload-content-top">
          <Button type='text' className="fileUpload-content-top-btn">选择文件</Button>
        </div>
        <div className="fileUpload-content-main">
          <BucketTable columns={columns} data={data} />
        </div>
        <div className="fileUpload-content-foot">
          <Button className="fileUpload-content-foot-btn">取消</Button>
          <div className="fileUpload-content-foot-right">
            <Popover
              name='压缩设置'
              button={false}
              mode={<Button type='text' className="fileUpload-content-foot-right-btn">压缩设置</Button>}
              content={<CompressionSite />}
            />
            <Button type='text' className="fileUpload-content-foot-right-btn">上传文件</Button>
          </div>
        </div>
      </div>

    </div>
  </>
}
export default fileUpload
