import React from 'react'
import './index.css'
import { Link } from "react-router-dom";
export default function DetailedSettings() {
    return (
        < >
            <div className='bucket-content-detail'>
                <div className='bucket-content-detail-content'>
                    详细设置
                    <Link to='/home/index/basic'>跳转到基础设置</Link>
                </div>
            </div></>
    )
}
