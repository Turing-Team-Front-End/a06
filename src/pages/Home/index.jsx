import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import "./index.css";
import logo from '../../assets/turingLogo2.svg'
import img1 from '../../assets/Component1.svg'
import img2 from '../../assets/Component2.svg'
import img3 from '../../assets/Component3.svg'
import img4 from '../../assets/Component4.svg'
export default function Home() {
    const items = [
        {
            img: img1,
            url: '/home/index'
        },
        {
            img: img2,
            url: '/home/document'
        },
        {
            img: img3,
            url: '/home/user'
        },
        {
            img: img4,
            url: '/home/site'
        },
    ]
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(`${e.target.name}`)
    };
    const listItems = items.map((item, index) => {
        return (<li key={index} className='item' onClick={onClick} ><img src={item.img} alt="" name={item.url} /></li>)
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
                <div className='top'>top</div>
                <div className='content1'></div>
                <Outlet />
            </div>

        </div>

    )
}
