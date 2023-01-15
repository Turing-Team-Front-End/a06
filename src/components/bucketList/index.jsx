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
      <Button className='bucket-create' type='text'>
        <PlusOutlined /> Create Bucket
      </Button>
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
