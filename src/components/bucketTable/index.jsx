import React, { useEffect, useState } from "react"
import { Table } from "antd"
import "./index.css"

function bucketTable(props) {
  useEffect(() => {
    // console.log(props)
  })
  return (
    <Table
      className='table-components'
      columns={props.columns}
      pagination={false}
      dataSource={props.data}
    />
  )
}
export default bucketTable
