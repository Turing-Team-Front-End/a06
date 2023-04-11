import React, { useEffect, useState } from "react"
import BucketTable from "../../components/bucketTable"
import Popover from "../../components/popover"
import UpdateUsername from "../../components/updateUsername"
import UpdateEmail from "../../components/updateEmail"
import UpdatePassword from "../../components/updatePassword"
import "./index.css"
import { logoutAPI } from "../../request/api/login"
import { userGetAPI, getLoginRecordAPI } from "../../request/api/user"
import { Avatar, message, Space, Spin, Pagination, Button, Popconfirm, Typography } from "antd"
const { Text } = Typography;
import { useNavigate } from "react-router-dom"

import icon from "../../assets/refresh-cw.svg"
import toby from "../../assets/toby.jpg"
import logo1 from "../../assets/turingLogo.svg"
// import { size } from "lodash"
const columns = [
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    width: "calc(25vw - 43px)",
    onHeaderCell: () => ({
      style: {
        backgroundColor: "#dde1ff",
        fontSize: "20px",
        fontWeight: 400,
        color: "#73768B",
        borderRadius: "8px 0 0 8px",
        borderColor: "#dde1ff"
      }
    }),
    onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
  },
  {
    title: "IP地址",
    dataIndex: "ip",
    key: "ip",
    width: "calc(25vw - 43px)",
    align: "center",
    onHeaderCell: () => ({
      style: {
        backgroundColor: "#dde1ff",
        fontSize: "20px",
        fontWeight: 400,
        color: "#73768B"
      }
    }),
    onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
  },
  {
    title: "城市",
    dataIndex: "city",
    key: "city",
    width: "calc(25vw - 43px)",
    align: "center",

    onHeaderCell: () => ({
      style: {
        backgroundColor: "#dde1ff",
        fontSize: "20px",
        fontWeight: 400,
        color: "#73768B"
      }
    }),
    onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
  },
  {
    title: "设备",
    dataIndex: "device",
    key: "device",
    width: "calc(25vw - 43px)",
    align: "center",

    onHeaderCell: () => ({
      style: {
        backgroundColor: "#dde1ff",
        fontSize: "20px",
        fontWeight: 400,
        color: "#73768B"
      }
    }),
    onCell: () => ({ style: { backgroundColor: "#f4f5fb" } })
  }
]
export default function Site() {
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const getUserData = async () => {
    try {
      let res = await userGetAPI();
      setId(res.data.data.id)
      setEmail(res.data.data.email)
      setUsername(res.data.data.username)
    }
    catch (error) {
      console.error(error);
    }
  }
  const getUserLoginData = async () => {
    try {
      let res = await getLoginRecordAPI(current, pageSize);
      //处理数据
      res.data.data.records.forEach((item, idnex) => {
        if (JSON.parse(item.city).hasOwnProperty('result')) {
          item.city = JSON.parse(item.city).result.ad_info.nation + '-' +
            JSON.parse(item.city).result.ad_info.province + '-' +
            JSON.parse(item.city).result.ad_info.city
        } else {
          item.city = JSON.parse(item.city).message
        }
        setData(res.data.data.records)
        setTotal(res.data.data.total)
      });
      setIsLoading(false)
    }
    catch (error) {
      console.error(error);
    }
  }
  const changePage = (page) => {
    setCurrent(page)
  }
  useEffect(() => {
    getUserData()
  }, [])
  useEffect(() => {
    getUserLoginData()
  }, [current])

  let navigate = useNavigate()
  const logout = () => {
    logoutAPI(data).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        message.success("登出成功！")
        sessionStorage.removeItem("token")
        navigate("/main/login")
      } else if (res.data.code === 401) {
        message.error("用户未登录！")
        navigate("/main/login")
      }
    })
  }
  const confirm = (e) => {
    console.log(e);
    logout()
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <>
      <div className='site-content'>
        <div className='site-content-own'>
          <div className='site-content-own-main'>
            <div className='site-content-own-main-name'>设置</div>
            <div className='site-content-own-main-icon'>
              <img src={icon} alt='' />
            </div>
          </div>
        </div>
        <div className='site-content-main'>
          <div className='site-left'>
            <div className='site-content-main-img'>
              <div className='site-content-main-img-icon'>
                <Avatar size={180} src={toby} />
              </div>
              <div className='site-content-main-img-set'>
                {/* <div className='site-content-main-img-set-name'>编辑</div>{" "} */}
              </div>
            </div>
            <div className='site-content-main-detail'>
              <div className='site-content-main-name'>
                <div className='site-content-main-name-title'>
                  <div className='site-content-main-name-title-content'>
                    名称
                  </div>
                </div>
                <div className='site-content-main-name-id'>
                  <Text mark className='site-content-main-name-id-content'>{username}</Text>
                </div>
                <div className='site-content-main-name-change'>
                  <Popover
                    name='修改用户名'
                    button={false}
                    mode={<Button type="link" className='site-content-main-name-change-content'>修改名称</Button>}
                    content={< UpdateUsername />}
                  />

                </div>
              </div>
              <div className='site-content-main-email'>
                <div className='site-content-main-email-title'>
                  <div className='site-content-main-email-title-content'>
                    邮箱
                  </div>
                </div>
                <div className='site-content-main-email-id'>
                  <Text mark className='site-content-main-email-id-content'>{email}</Text>
                </div>
                <div className='site-content-main-email-change'>
                  <Popover
                    name='修改邮箱'
                    button={false}
                    mode={<Button type="link" className='site-content-main-email-change-content'>修改邮箱</Button>}
                    content={< UpdateEmail />}
                  />

                </div>
              </div>
              <div className='site-content-main-password'>
                <div className='site-content-main-password-title'>

                  <div className='site-content-main-password-title-content'>
                    密码
                  </div>
                </div>
                <div className='site-content-main-password-change'>
                  <Popover
                    name='修改密码'
                    button={false}
                    mode={<Button type="link" className='site-content-main-password-change-content'>修改密码</Button>}
                    content={< UpdatePassword />}
                  />

                </div>
              </div>
              {/* <div className='site-content-main-admin'>
                <div className='site-content-main-admin-title'>权限</div>
                <div className='site-content-main-admin-id'>
                  <div className='site-content-main-admin-id-content'>
                    admin
                  </div>
                </div>
              </div>
              <div className='site-content-main-invite'>
                <div className='site-content-main-invite-title'>
                  <div className='site-content-main-invite-title-content'>
                    邀请码
                  </div>
                </div>
                <div className='site-content-main-invite-id'>
                  <div className='site-content-main-invite-id-content'>
                    114514
                  </div>
                </div>
              </div> */}
              <div className='site-content-main-user'>
                <div className='site-content-main-user-title'>
                  <div className='site-content-main-user-title-content'>
                    账号
                  </div>
                </div>
                <div className='site-content-main-user-id'>
                  <Popconfirm
                    title="是否要退出登录？"
                    description="是否要退出登录？"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" className='site-content-main-user-id-content'>退出登录</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
          <div className='site-right'>
            <Spin tip="Loading" spinning={isLoading}>
              <BucketTable columns={columns} data={data} />
              <Pagination current={current}
                total={total}
                pageSize={pageSize}
                onChange={changePage}
                style={{ position: "bottomCenter" }}
              />
            </Spin>
          </div>
        </div>
      </div>
    </>
  )
}
