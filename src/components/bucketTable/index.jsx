import React, { useEffect, useState } from "react"
import { Table } from "antd"
function bucketTable(props) {
  useEffect(() => {
    console.log(props)
  })
  return (
    <Table
      className='table-components'
      columns={props.columns}
      pagination={{
        position: ["bottomCenter"]
      }}
      dataSource={props.data}
    />
  )
}
export default bucketTable
