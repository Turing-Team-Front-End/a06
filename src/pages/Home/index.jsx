import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, message, Upload, Input, Avatar } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.css";
import logo from "../../assets/turingLogo2.svg";
import img1 from "../../assets/Component1.svg";
import img2 from "../../assets/Component2.svg";
import img3 from "../../assets/Component3.svg";
import img4 from "../../assets/Component4.svg";
import img5 from "../../assets/Component5.svg";
import img6 from "../../assets/Component6.svg";
import img7 from "../../assets/Component7.svg";
import img8 from "../../assets/Component8.svg";
import toby from "../../assets/toby.jpg";
export default function Home() {
    //先这样，要用redux解决
    //目前打开home页会白屏，原因是sessionStorage里没有值，所以无法渲染组件
    //手动添加 Key    Value
    //       key    /src/assets/Component5.svg
    //       index  0 


    useEffect(() => {
        if (window.sessionStorage.length == 0) {
            window.sessionStorage.setItem("index", 0);
            window.sessionStorage.setItem("key", img5);
            window.sessionStorage.setItem("name", "Bucket");
            setName(window.sessionStorage.getItem("name"))
        }
        let allImg = document.querySelectorAll("li img")
        let index = window.sessionStorage.getItem("index")
        let key = window.sessionStorage.getItem("key")
        allImg[index].setAttribute("src", key)

    }, [])
    const [name, setName] = useState(window.sessionStorage.getItem("name"));
    const props = {
        name: "file",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        headers: {
            authorization: "authorization-text"
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    const items = [
        {
            img: img1,
            imgActive: img5,
            url: "/home/index",
            name: "Bucket"
        },
        {
            img: img2,
            imgActive: img6,
            url: "/home/document",
            name: "文件管理"
        },
        {
            img: img3,
            imgActive: img7,
            url: "/home/user",
            name: "用户管理"
        },
        {
            img: img4,
            imgActive: img8,
            url: "/home/site",
            name: "设置"
        }
    ];
    const navigate = useNavigate();
    const onClick = (e) => {
        //排他思想

        //先获取所有的item
        let allImg = document.querySelectorAll("li img")
        items.forEach((item, index) => {
            //点击当前按钮
            if (e.target.getAttribute('src') == item.img) {
                //再次循环，先将所有item的图片换成原来的无active的图片
                items.forEach((item, index) => {
                    allImg[index].setAttribute("src", item.img)
                })
                //再将当前点击的item图片换成active的
                e.target.setAttribute("src", item.imgActive)
                //把当前的active和index保存在本地
                console.log(item, index);
                window.sessionStorage.setItem("index", index);
                window.sessionStorage.setItem("key", item.imgActive);

            }

        })
        navigate(`${e.target.id}`);
        setName(e.target.name);
        window.sessionStorage.setItem("name", e.target.name);

    };
    const listItems = items.map((item, index) => {
        return (
            <li key={index} className='item' onClick={onClick}>
                <img src={item.img} id={item.url} name={item.name} />
            </li>
        );
    });
    return (
        <div className='main1'>
            <div className='side '>
                <div className='logo'>
                    <img src={logo} alt='' />
                </div>
                <ul className='bar'>{listItems}</ul>
            </div>
            <div className='right'>
                <div className='top'>
                    <div className='topName'>
                        <div className='topName-content'>{name}</div>
                    </div>
                    <Input className='top-input' placeholder="搜索..." prefix={<SearchOutlined />} />
                    <div className='top-right'>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />} className='upload'>
                                上传文件
                            </Button>
                        </Upload>
                        <Button className='admin'>admin</Button>
                        <Button className='logout'>退出登录</Button>
                        <div className='img-logo'><Avatar size={56} src={toby} /></div>
                    </div>
                </div>
                <div className='content1'>
                    <Outlet />
                </div>

            </div>
        </div>
    );
}
