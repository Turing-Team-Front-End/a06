import React, { useEffect, useState } from "react"
import BucketList from "../../components/bucketList"
import NotSelected from "../../components/notSelected"

import { Button, Input, Table, Card, Col, Row } from "antd"
import {
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined
} from "@ant-design/icons"
import user from "../../assets/Component7.svg"

import "./index.css"
export default function Document() {
  return (
    <>
      <BucketList />
      <div className='document-content'>
        <div className='document-content-top'>
          <div className='document-content-title'>文件管理</div>
          <div className='document-content-bucket-name'>Bucket011111</div>
          <Button className='document-user-manage' type='text'>
            <img src={user} />
            用户管理
          </Button>
        </div>
        <div className='document-operation'>
          <div className='document-operation-left'>
            <Button
              icon={<UploadOutlined />}
              className='document-upload'
              type='text'
            >
              上传文件
            </Button>
            <Button
              icon={<DownloadOutlined />}
              className='document-download'
              type='text'
            ></Button>
            <div className='document-selected'>0个已选中</div>
          </div>
          <div className='document-operation-right'>
            <Input
              className='document-search'
              placeholder='搜索文件...'
              prefix={<SearchOutlined className='search-svg' />}
            ></Input>
            <Button className='document-delete' type='text'>
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
        <div className='document-notselected'>
          <NotSelected />
        </div>
      </div>
    </>
  )
}
