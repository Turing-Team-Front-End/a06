import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Button, message, Input, Avatar } from "antd"
import { UploadOutlined, SearchOutlined } from "@ant-design/icons"
import "./index.css"
import Popover from "../../components/popover"
import TaskList from "../../components/taskList"
import logo from "../../assets/turingLogo2.svg"
import img1 from "../../assets/Component1.svg"
import img2 from "../../assets/Component2.svg"
import img4 from "../../assets/Component4.svg"
import img5 from "../../assets/Component5.svg"
import img6 from "../../assets/Component6.svg"
import img8 from "../../assets/Component8.svg"
import toby from "../../assets/toby.jpg"
export default function Home() {
  const [name, setName] = useState("")

  useEffect(() => {
    let str
    console.log(window.location.pathname);
    if (window.location.pathname.length > 14) {
      str = "bucket"
    } else { str = window.location.pathname.slice(6) }

    window.sessionStorage.setItem("name", str)
    switch (str) {
      case "bucket":
        window.sessionStorage.setItem("index", 0)
        window.sessionStorage.setItem("key", img5)
        setName("Bucket")
        break
      case "document":
        window.sessionStorage.setItem("index", 1)
        window.sessionStorage.setItem("key", img6)
        setName("统计")
        break
      case "site":
        window.sessionStorage.setItem("index", 2)
        window.sessionStorage.setItem("key", img8)
        setName("设置")
        break
    }

    let allImg = document.querySelectorAll("li img")
    let index = window.sessionStorage.getItem("index")
    let key = window.sessionStorage.getItem("key")
    let name = window.sessionStorage.getItem("name")
    allImg[index].setAttribute("src", key)
    let buttonLightUp = async function () {
      document.getElementById(name).classList.add("button-active")
    }
    buttonLightUp()
  }, [])

  const items = [
    {
      img: img1,
      imgActive: img5,
      url: "/home/bucket",
      name: "bucket"
    },
    {
      img: img2,
      imgActive: img6,
      url: "/home/document",
      name: "document"
    },
    {
      img: img4,
      imgActive: img8,
      url: "/home/site",
      name: "site"
    }
  ]
  const navigate = useNavigate()
  const onClick = (e) => {
    //排他思想
    //先获取所有的item
    let allImg = document.querySelectorAll("li img")
    items.forEach((item, index) => {
      //点击当前按钮
      if (e.target.getAttribute("src") == item.img) {
        //再次循环，先将所有item的图片换成原来的无active的图片
        items.forEach((item, index) => {
          allImg[index].setAttribute("src", item.img)
          document.getElementById(item.name).classList.remove("button-active")
        })
        //再将当前点击的item图片换成active的
        e.target.setAttribute("src", item.imgActive)
        document.getElementById(item.name).classList.add("button-active")

        //把当前的active和index保存在本地
        // console.log(item, index);
        window.sessionStorage.setItem("index", index)
        window.sessionStorage.setItem("key", item.imgActive)
      }
    })
    console.log(e)
    navigate(`${e.target.id}`)
    window.sessionStorage.setItem("name", e.target.name)
    window.sessionStorage.setItem("key", e.target.src)

    switch (e.target.name) {
      case "bucket":
        window.sessionStorage.setItem("index", 0)
        setName("Bucket")

        break

      case "document":
        window.sessionStorage.setItem("index", 1)
        setName("统计")

        break

      case "site":
        window.sessionStorage.setItem("index", 2)
        setName("设置")

        break
    }
  }
  const listItems = items.map((item, index) => {
    return (
      <li key={index} className='item' id={`${item.name}`}>
        <img src={item.img} id={item.url} name={item.name} onClick={onClick} />
      </li>
    )
  })
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
          <div className='top-right'>

            <Popover
              name='任务列表'
              button={false}
              mode={<Button className='upload'>任务列表</Button>}
              content={<TaskList />}
            />
            <div className='img-logo'>
              <Avatar size={56} src={toby} />
            </div>
          </div>
        </div>
        <div className='content1'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
