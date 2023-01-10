import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.css";
export default function Bucket() {
  return (
    <>
      <div className='bucket-side'>
        <Input
          className='bucket-search'
          placeholder='搜索Bucket'
          prefix={<SearchOutlined className='search-svg' />}
        ></Input>
        <div className='bucket-operating'></div>
      </div>
      <Outlet />
    </>
  );
}
