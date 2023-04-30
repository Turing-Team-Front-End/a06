import React, { useEffect, useState } from "react"
import { Table, message } from "antd"
import "./index.css"

function bucketTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  useEffect(() => {}, [selectedRowKeys])

  const onSelectChange = (newSelectedRowKeys) => {
    if (newSelectedRowKeys.length <= 2) {
      let x = props.data.filter((item) => newSelectedRowKeys.includes(item.id))
      console.log(x)
      if (x.length === 0) {
      } else {
        if (
          x[0].fileName.endsWith(".png") ||
          x[0].fileName.endsWith(".jpg") ||
          x[0].fileName.endsWith(".jpeg") ||
          x[0].fileName.endsWith(".gif")
        ) {
          if (x.length === 2) {
            if (
              x[1].fileName.endsWith(".png") ||
              x[1].fileName.endsWith(".jpg") ||
              x[1].fileName.endsWith(".jpeg") ||
              x[1].fileName.endsWith(".gif")
            ) {
            } else {
              message.error("不能选择非图片文件进行比对")
              return
            }
          }
        } else {
          message.error("不能选择非图片文件进行比对")
          return
        }
      }
      if (x.length === 1) {
        props.showName([x[0].fileName])
      } else if (x.length === 2) {
        props.showName([x[0].fileName, x[1].fileName])
      }
      setSelectedRowKeys(newSelectedRowKeys)
      props.onSelectedFileChange(newSelectedRowKeys)
    } else {
      message.error("只能选择两个文件进行比对")
      return
    }
  }
  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    columnWidth: 10,
    preserveSelectedRowKeys: true,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length === 2
  return (
    <Table
      className='table-components'
      columns={props.columns}
      pagination={false}
      dataSource={props.data}
      rowSelection={rowSelection}
      rowKey={(record) => record.id}
    />
  )
}
export default bucketTable
