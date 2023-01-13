import React, { useEffect, useState } from "react";
import { Button, Input, Table, Card, Col, Row } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.css";
const columns = [
  {
    dataIndex: "content",
    className: "bucket-columns",
    ellipsis: true
  }
];
export default function bucketList() {
  // var uA = navigator;
  // console.log(uA);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    hideSelectAll: true,
    columnWidth: 10,
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
    <div className='bucket-side'>
      <Input
        className='bucket-search'
        placeholder='搜索Bucket'
        prefix={<SearchOutlined className='search-svg' />}
      ></Input>
      <div className='bucket-operating'>
        <Button className='bucket-delete' type='text'>
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
        <Button className='bucket-create' type='text'>
          <PlusOutlined /> Create Bucket
        </Button>
      </div>
      <Table
        className='bucket-table'
        columns={columns}
        dataSource={bucketData}
        rowSelection={rowSelection}
        pagination={{
          position: ["bottomCenter"],
          className: "bucket-table-pagination",
          total: "151",
          showSizeChanger: false
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              const selecting = [...selectedRowKeys];
              console.log(selecting);
              if (selecting.indexOf(record.key) >= 0) {
                selecting.splice(selecting.indexOf(record.key), 1);
              } else {
                selecting.splice(0, 1);
                selecting.push(record.key);
              }
              setSelectedRowKeys(selecting);
            }
          };
        }}
      />
    </div>
  );
}
