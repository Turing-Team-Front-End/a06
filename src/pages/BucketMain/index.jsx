import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BucketTable from "../../components/bucketTable"
import Popover from "../../components/popover"
import DeleteWarning from "../../components/deleteWarning"
import UserManage from "../../components/userManage"
import { Button, Input, Space } from "antd"
import { SearchOutlined, PlusOutlined } from "@ant-design/icons"
import "./index.css"

export default function BucketMain() {
  const navigate = useNavigate()
  const ToRoute = (record) => {
    console.log(record)
    navigate(`/home/bucket/${record.name}`)
  }
  const columns = [
    {
      title: "Bucket名",
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
      title: "更新时间",
      dataIndex: "time",
      key: "time",
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
      title: "文件数",
      dataIndex: "number",
      key: "number",
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
          <a style={{ color: "#3452CE" }} onClick={() => ToRoute(record)}>
            文件
          </a>
          <Popover
            name={
              <>
                用户管理
                <div className='bucket-user-title'>/ {record.name}</div>
              </>
            }
            button={true}
            record={record}
            mode={<a style={{ color: "#3452CE" }}>用户管理</a>}
            content={<UserManage />}
          />
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
      name: "Bucket01",
      time: "2002.02.02",
      number: "22"
    },
    {
      key: "2",
      name: "11111",
      time: "2022.02.02",
      number: "22"
    },
    {
      key: "3",
      name: "Joe Black",
      time: "2022.02.02",
      number: "22"
    }
  ]
  // textDecorationLine: "underline"
  return (
    <div className='bucket-content'>
      <div className='bucket-content-top'>
        <div className='bucket-title'>所有Bucket</div>
      </div>
      <div className='bucket-content-mid'>
        <Button className='bucket-create' type='text'>
          <PlusOutlined /> Create Bucket
        </Button>
        <Input
          className='bucket-search'
          placeholder='搜索Bucket...'
          prefix={<SearchOutlined className='search-svg' />}
        ></Input>
      </div>
      <div className='bucket-content-bottom'>
        <BucketTable columns={columns} data={data} />
        {/* <Popover
            name='用户管理'
            button={true}
            mode={<a style={{ color: "#3452CE" }}>用户管理</a>}
            table={<BucketTable columns={columns} data={data} />}
          /> */}
      </div>
    </div>
  )
}
