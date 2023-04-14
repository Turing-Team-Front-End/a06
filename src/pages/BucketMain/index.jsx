import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BucketTable from "../../components/bucketTable"
import Popover from "../../components/popover"
import DeleteWarning from "../../components/deleteWarning"
import UserManage from "../../components/userManage"
import CreateBucket from "../../components/createBucket"
import { Button, Input, Space, Spin, Pagination } from "antd"
import { SearchOutlined, PlusOutlined } from "@ant-design/icons"
import "./index.css"
import { bucketListAllAPI } from "../../request/api/bucket"

export default function BucketMain() {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const getBucketData = async () => {
    try {
      let res = await bucketListAllAPI(current, pageSize)
      if (res.data.data === null) {
        setIsLoading(false)
      }
      setData(res.data.data.records)
      setTotal(res.data.data.total)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  // const getTotalData = async () => {
  //   try {
  //     let res = await bucketCountAPI();
  //     setTotal(res.data.data)
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const changePage = (page) => {
    setCurrent(page)
  }
  useEffect(() => {
    getBucketData()
    // getTotalData()
  }, [current, total])

  const navigate = useNavigate()
  const ToRoute = (record) => {
    console.log(record, 111)
    navigate(`/home/bucket/${record.id}/${record.name}/${record.privilege}`)
  }
  const columns = [
    {
      title: "Bucket名",
      dataIndex: "name",
      key: "name",
      width: "calc(20vw - 43px)",
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
      width: "calc(20vw - 43px)",
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
      title: "总共大小",
      dataIndex: "totalSize",
      key: "totalSize",
      width: "calc(20vw - 43px)",
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
      title: "已使用大小",
      dataIndex: "usedSize",
      key: "usedSize",
      width: "calc(20vw - 43px)",
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
      width: "calc(20vw - 43px)",
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
          {record.privilege === "rw" ? (
            <Popover
              name={
                <>
                  用户管理
                  <div className='bucket-user-title'>/ {record.name}</div>
                </>
              }
              record={record}
              mode={<a style={{ color: "#3452CE" }}>用户管理</a>}
              content={<UserManage record={record} />}
            />
          ) : null}
          {record.privilege === "rw" ? (
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

  // textDecorationLine: "underline"
  return (
    <div className='bucket-content'>
      <div className='bucket-content-top'>
        <div className='bucket-title'>所有Bucket</div>
      </div>
      <div className='bucket-content-mid'>
        <Popover
          name='创建bucket'
          button={false}
          mode={
            <Button className='bucket-create' type='text'>
              <PlusOutlined /> Create Bucket
            </Button>
          }
          content={<CreateBucket />}
        />
        <Input
          className='bucket-search'
          placeholder='搜索Bucket...'
          prefix={<SearchOutlined className='search-svg' />}
        ></Input>
      </div>
      <div className='bucket-content-midBottom'>
        <Spin tip='Loading' spinning={isLoading}>
          <BucketTable columns={columns} data={data} />
        </Spin>
      </div>
      <div className='bucket-content-bottom'>
        <Pagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={changePage}
        />
      </div>
    </div>
  )
}
