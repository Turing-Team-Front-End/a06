import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "./index.css";
import logo from '../../assets/turingLogo2.svg'
import img1 from '../../assets/Component1.svg'
import img2 from '../../assets/Component2.svg'
import img3 from '../../assets/Component3.svg'
import img4 from '../../assets/Component4.svg'
export default function Home() {
    const [name, setname] = useState('Bucket')
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const items = [
        {
            img: img1,
            url: '/home/index',
            name: 'Bucket'
        },
        {
            img: img2,
            url: '/home/document',
            name: '文件管理'
        },
        {
            img: img3,
            url: '/home/user',
            name: '用户管理'
        },
        {
            img: img4,
            url: '/home/site',
            name: '设置'
        },
    ]
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(`${e.target.alt}`)
        setname(e.target.name)
    };
    const listItems = items.map((item, index) => {
        return (<li key={index} className='item' onClick={onClick} ><img src={item.img} alt={item.url} name={item.name} /></li>)
    })
    return (
        <div className='main1'>
            <div className='side '>
                <div className='logo'>
                    <img src={logo} alt="" />
                </div>
                <ul className='bar'>
                    {listItems}
                </ul>
            </div>
            <div className='right'>
                <div className='top'>
                    <div className='topName'>
                        <div className='topName-content'>{name}</div>
                    </div>

                    <input type="text" name="" id="" className='top-input' placeholder='搜索...' />
                    <div className='top-right'>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />} className='upload'>上传文件</Button>
                        </Upload>
                        <Button className='admin'>admin</Button>
                        <Button className='logout'>退出登录</Button>
                        <div className='img-logo'></div>
                    </div>
                </div>
                <div className='content1'></div>
                <Outlet />
            </div>

        </div>

    )
}
