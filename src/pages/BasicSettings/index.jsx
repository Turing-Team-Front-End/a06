import React from 'react'
import './index.css'
import { Link } from "react-router-dom";
export default function BasicSettings() {
    return (
        <>
            <div className='bucket-content'>
                <div className='bucket-data'>bucket-data</div>
                <div className='bucket-mid'>
                    <div className='bucket-mid-content'>bucket-mid-content</div>
                </div>
                <div className='bucket-site'>基础设置
                    <Link to='/home/bucket/detail'>跳转到详细设置</Link></div>
            </div>
        </>
    )
}
