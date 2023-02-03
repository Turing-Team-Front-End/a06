import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import "./index.css"
export default function BucketDetail() {
    const params = useParams()
    return (
        <div className='bucket-content'>
            <div className='bucket-content-top'>
                <div className='bucket-title'>Bucket/{params.name}</div>
            </div>
            <div className='bucket-content-mid'>
                <Button className='bucket-create' type='text'>
                    上传文件
                </Button>
                <Input
                    className='bucket-search'
                    placeholder='搜索Bucket...'
                    prefix={<SearchOutlined className='search-svg' />}
                ></Input>
            </div>
        </div>
    )
}
