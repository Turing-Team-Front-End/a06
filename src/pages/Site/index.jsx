import React from 'react'
import './index.css'
import { Avatar } from "antd";
import icon from '../../assets/refresh-cw.svg'
import toby from "../../assets/toby.jpg";
export default function Site() {
    return (
        <div className='content1'>
            <div className='site-content'>
                <div className='site-content-own'>
                    <div className='site-content-own-main'>
                        <div className='site-content-own-main-name'>个人设置</div>
                        <div className='site-content-own-main-icon'>
                            <img src={icon} alt="" />
                        </div>
                    </div>
                </div>
                <div className='site-content-main'>
                    <div className='site-content-main-img'>
                        <div className='site-content-main-img-icon'>
                            <Avatar size={180} src={toby} />
                        </div>
                        <div className='site-content-main-img-set'>
                            <div className='site-content-main-img-set-name'>编辑</div> </div>
                    </div>
                    <div className='site-content-main-detail'>
                        <div className='site-content-main-name'>
                            <div className='site-content-main-name-title'>
                                <div className='site-content-main-name-title-content'>名字</div>
                            </div>
                            <div className='site-content-main-name-id'>
                                <div className='site-content-main-name-id-content'>TOBY</div>
                            </div>
                            <div className='site-content-main-name-change'>
                                <div className='site-content-main-name-change-content'>修改名字</div>
                            </div>
                        </div>
                        <div className='site-content-main-email'>
                            <div className='site-content-main-email-title'>
                                <div className='site-content-main-email-title-content'>邮箱</div>
                            </div>
                            <div className='site-content-main-email-id'>
                                <div className='site-content-main-email-id-content'>123</div>
                            </div>
                            <div className='site-content-main-email-change'>
                                <div className='site-content-main-email-change-content'>修改邮箱</div>
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
            </div>
        </div>
    )
}
