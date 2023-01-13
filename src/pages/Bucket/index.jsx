import React, { useEffect, useState } from "react";
import BucketList from "../../components/bucketList";
import { Button, Input, Table, Card, Col, Row } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import document from "../../assets/document.svg";

import "./index.css";
const columns = [
  {
    title: "全选",
    dataIndex: "content",
    className: "bucket-columns",
    ellipsis: true
  }
];
export default function Bucket() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const start = () => {
    setSelectedRowKeys([]);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;
  const bucketData = [
    {
      key: 0,
      content: "Bucket011111"
    },
    {
      key: 1,
      content: "00000000000000000000000000000000000000000000"
    },
    {
      key: 2,
      content: "bucket03"
    },
    {
      key: 3,
      content: "bucket114514111111"
    },
    {
      key: 4,
      content: "bucket114514111111"
    },
    {
      key: 5,
      content: "bucket114514111111"
    },
    {
      key: 6,
      content: "bucket114514111111"
    },
    {
      key: 7,
      content: "bucket114514111111"
    },
    {
      key: 8,
      content: "bucket114514111111"
    },
    {
      key: 9,
      content: "bucket114514111111"
    },
    {
      key: 10,
      content: "bucket114514111111"
    },
    {
      key: 11,
      content: "bucket114514111111"
    },
    {
      key: 12,
      content: "bucket114514111111"
    }
  ];
  return (
    <>
      <BucketList />
      {/* 右边区域  */}
      <div className='bucket-content'>
        <div className='bucket-data'>
          <div className='bucket-content-top'>
            <div className='bucket-title'>基础数据</div>
            <div className='bucket-data-bucket-name'>Bucket011111</div>
            <Button className='bucket-data-manage' type='text'>
              <img src={document} />
              文件管理
            </Button>
          </div>
          <div className='bucket-content-bottom bucket-data-card-box'>
            <div className='bucket-data-card' style={{ order: 0 }}>
              <div className='bucket-data-card-title'>储存总量</div>
              <div className='bucket-data-card-content'>
                <div className='bucket-data-number'>0</div>
                <div className='bucket-data-unit'>Byte</div>
              </div>
            </div>
            <div className='bucket-data-card' style={{ order: 1 }}>
              <div className='bucket-data-card-title'>本月外网流量</div>
              <div className='bucket-data-card-content'>
                <div className='bucket-data-number'>0</div>
                <div className='bucket-data-unit'>Byte</div>
              </div>
            </div>
            <div className='bucket-data-card' style={{ order: 2 }}>
              <div className='bucket-data-card-title'>文件数量</div>
              <div className='bucket-data-card-content'>
                <div className='bucket-data-number'>0</div>
              </div>
            </div>
          </div>
        </div>
        <div className='bucket-mid'>
          <div className='bucket-content-top'>
            <div className='bucket-title'>访问域名</div>
          </div>
          <div className='bucket-content-bottom'></div>
        </div>
        <div className='bucket-site'>
          <div className='bucket-content-top'>
            <div className='bucket-title'>基础设置</div>
            <div className='bucket-site-bucket-name'></div>
          </div>
          <div className='bucket-content-bottom'></div>
        </div>
      </div>
    </>
  );
}
