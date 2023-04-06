import React, { useEffect, useState } from "react"
import { Table } from "antd"
import "./index.css"

function bucketTable(props) {
  useEffect(() => {

  })

  return (
    <Table
      className='table-components'
      columns={props.columns}
      pagination={false}
      dataSource={props.data}
      rowKey={(record) => record.id}
    />
  )
}
export default bucketTable
