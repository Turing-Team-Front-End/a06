import React, { useEffect, useState } from "react"
import { Select, Input, Button, Table, message, Spin, Pagination } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Popover from "../popover"
import SetUserPrivilege from "../setUserPrivilege"
import {
  getBucketPrivilegeAPI,
  updateBucketPrivilegeAPI,
  deleteBucketPrivilegeAPI
} from "../../request/api/bucketPrivilege"
import "./index.css"
const handleChange = async (value) => {
  // console.log(`${value.value}`)
  const arr = value.value.split(" ")
  const id = arr[0]
  let privilege
  if (privilege == "只读") privilege = "r"
  else privilege = "rw"
  // console.log(id)
  try {
    let res = await updateBucketPrivilegeAPI(id, privilege)
    console.log(res)
    if (res.data.code === 200) {
      message.success("修改成功")
    } else if (res.data.code === 500) {
      message.error(res.data.msg)
    }
  } catch (error) {
    message.error("修改失败:", error)
  }
}

const deletePrivilege = async (id) => {
  try {
    let res = await deleteBucketPrivilegeAPI(id)
    console.log(res)
    if (res.data.code === 200) {
      message.success("删除成功")
    } else if (res.data.code === 500) {
      message.error(res.data.msg)
    }
  } catch (error) {
    message.error("删除失败:", error)
  }
}

function userManage(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const hasSelected = selectedRowKeys.length > 0
  const batchChange = async (value) => {
    console.log(value)
    if (!hasSelected) {
      message.error("请选择需要修改的用户")
      return
    }
    for (const key of selectedRowKeys) {
      const arr = key.split(" ")
      const id = arr[0]
      const uid = Number(arr[1])
      if (uid === props.record.uid) continue
      try {
        let res = await updateBucketPrivilegeAPI(id, value.value)
        // console.log(res)
        if (res.data.code === 200) {
          message.success("修改成功")
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
        }
      } catch (error) {
        message.error("修改失败:", error)
      }
    }
  }
  const columns = [
    {
      title: "用户",
      dataIndex: "username",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          fontSize: "20px",
          fontWeight: 400,
          color: "#73768B"
        }
      })
    },
    {
      title: (
        <>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#73768B"
            }}
          >
            批量修改(选中左侧复选框)
          </p>
          <Select
            className='dropdown'
            defaultValue={{
              value: "r",
              label: "只读"
            }}
            bordered={false}
            labelInValue
            onChange={batchChange}
            options={[
              {
                value: "rw",
                label: "读写"
              },
              {
                value: "r",
                label: "只读"
              }
            ]}
          />
        </>
      ),
      dataIndex: "action",
      key: "action",
      align: "right",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#dde1ff",
          borderRadius: "0 8px 8px 0"
        }
      })
    }
  ]

  const getBucketPrivilegeData = async () => {
    try {
      let res = await getBucketPrivilegeAPI(props.record.id, current, pageSize)
      console.log(res.data.data.records)
      const newData = res.data.data.records.map((record) => ({
        ...record,
        key: record.id + " " + record.uid,
        action: (
          <Select
            className='dropdown'
            defaultValue={
              record.privilege === "rw"
                ? { value: `${record.id} 读写`, label: "读写" }
                : { value: `${record.id} 只读`, label: "只读" }
            }
            bordered={false}
            labelInValue
            disabled={props.record.uid === record.uid ? true : false}
            onChange={handleChange}
            options={[
              {
                value: `${record.id} 读写`,
                label: "读写"
              },
              {
                value: `${record.id} 只读`,
                label: "只读"
              }
            ]}
          />
        )
      }))
      // console.log(newData)
      setData(newData)
      setTotal(res.data.data.total)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const changePage = (page) => {
    setCurrent(page)
  }
  const rowSelection = {
    selectedRowKeys,
    style: { backgroundColor: "#dde1ff" },
    // hideSelectAll: true,
    columnWidth: 10,
    onChange: onSelectChange
  }

  useEffect(() => {
    getBucketPrivilegeData()
  }, [current, total])
  return (
    <>
      <div className='user-top'>
        <div className='user-title'>所有用户</div>
        <Popover
          name='设定用户权限'
          mode={
            <Button className='user-button' type='text'>
              设定用户权限
            </Button>
          }
          content={<SetUserPrivilege bid={props.record.id} />}
        />
      </div>
      <div className='user-mid'>
        <div className='user-left'>
          <p>查看用户组</p>
          <Select
            className='dropdown'
            defaultValue='全部'
            bordered={false}
            labelInValue
            // onChange={handleChange}
            options={[
              {
                value: "全部",
                label: "全部"
              },
              {
                value: "读写",
                label: "读写"
              },
              {
                value: "只读",
                label: "只读"
              }
            ]}
          />
          <p>{selectedRowKeys.length}个已选中</p>
        </div>
        {/* <div className='user-right'>
          <Input
            className='user-search'
            placeholder='搜索Bucket...'
            prefix={<SearchOutlined className='search-svg' />}
          ></Input>
          <Button className='user-delete' type='text'>
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
          </Button>
        </div> */}
      </div>
      <div className='user-bottom'>
        <Spin tip='Loading' spinning={isLoading}>
          <Table
            className='user-manage-table'
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={false}
          />
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
          />
        </Spin>
      </div>
    </>
  )
}
export default userManage
