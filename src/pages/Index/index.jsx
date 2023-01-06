import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
export default function Index() {
    return (
        <div className='content1'>
            <div className='bucket-side'>bucket-side</div>
            <Outlet />
        </div>
    )
}
