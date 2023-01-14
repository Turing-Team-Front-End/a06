import React, { useEffect, useState } from "react";
import BucketList from "../../components/bucketList";
import { Button, Input, Table, Card, Col, Row } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined
} from "@ant-design/icons";
import user from "../../assets/Component7.svg";

import "./index.css";
export default function Document() {
  return (
    <>
      <BucketList />
      <div className='document-content'>
        <div className='document-content-top'>
          <div className='document-content-title'>文件管理</div>
          <div className='document-content-bucket-name'>Bucket0111</div>
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
          <div className='document-operation-right'></div>
        </div>
      </div>
    </>
  );
}
