import React, { useEffect, useState } from "react"
import { Select, Input, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"

import BucketTable from "../../components/bucketTable"

import "./index.css"
const handleChange = (value) => {
  console.log(`selected ${value}`)
}
function userManage(props) {
  useEffect(() => {
    console.log(props)
  })
  return (
    <>
      <div className='user-top'>
        <div className='user-title'>所有用户</div>
      </div>
      <div className='user-mid'>
        <div className='user-left'>
          <p>查看用户组</p>
          <div className='dropdown'>
            <Select
              defaultValue='全部'
              style={{
                width: 120
              }}
              onChange={handleChange}
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
          </div>
          <p>0个已选中</p>
        </div>
        <div className='user-right'>
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
        </div>
      </div>
      <div className='user-bottom'></div>
    </>
  )
}
export default userManage
