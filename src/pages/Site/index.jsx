import React from "react"
import BucketTable from "../../components/bucketTable"

import "./index.css"
import { Avatar, Space } from "antd"
import icon from "../../assets/refresh-cw.svg"
import toby from "../../assets/toby.jpg"
export default function Site() {
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
      dataIndex: "address",
      key: "address",
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
      dataIndex: "equipment",
      key: "equipment",
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
  const data = [
    {
      key: "1",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "2",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "3",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "4",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "5",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "6",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "7",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    },
    {
      key: "8",
      time: "2023.01.01",
      address: "16.179.33.148",
      city: "广东广州",
      equipment: "mac"
    }
  ]
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
                <div className='site-content-main-img-set-name'>编辑</div>{" "}
              </div>
            </div>
            <div className='site-content-main-detail'>
              <div className='site-content-main-name'>
                <div className='site-content-main-name-title'>
                  <div className='site-content-main-name-title-content'>
                    名字
                  </div>
                </div>
                <div className='site-content-main-name-id'>
                  <div className='site-content-main-name-id-content'>TOBY</div>
                </div>
                <div className='site-content-main-name-change'>
                  <div className='site-content-main-name-change-content'>
                    修改名字
                  </div>
                </div>
              </div>
              <div className='site-content-main-email'>
                <div className='site-content-main-email-title'>
                  <div className='site-content-main-email-title-content'>
                    邮箱
                  </div>
                </div>
                <div className='site-content-main-email-id'>
                  <div className='site-content-main-email-id-content'>123</div>
                </div>
                <div className='site-content-main-email-change'>
                  <div className='site-content-main-email-change-content'>
                    修改邮箱
                  </div>
                </div>
              </div>
              <div className='site-content-main-password'>
                <div className='site-content-main-password-title'>
                  <div className='site-content-main-password-title-content'>
                    密码
                  </div>
                </div>
                <div className='site-content-main-password-change'>
                  <div className='site-content-main-password-change-content'>
                    修改密码
                  </div>
                </div>
              </div>
              <div className='site-content-main-admin'>
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
              </div>
              <div className='site-content-main-user'>
                <div className='site-content-main-user-title'>
                  <div className='site-content-main-user-title-content'>
                    账号
                  </div>
                </div>
                <div className='site-content-main-user-id'>
                  <div className='site-content-main-user-id-content'>
                    删除账号
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='site-right'>
            <BucketTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
