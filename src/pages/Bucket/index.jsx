import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
export default function Bucket() {
    return (
        <>
            <div className='bucket-side'>bucket-side</div>
            <Outlet />
        </>
    )
}
