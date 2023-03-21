import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.css";
import { Link } from "react-router-dom";
import { registryAPI } from "../../request/api/login"
export default function Register() {
  // const [em, setem] = useState('1505994122@qq.com')
  // const [pwd, setpwd] = useState('2002621hhw')
  // const [name, setname] = useState('TOBY')
  // const submit = () => {
  //   const data = {
  //     username: name,
  //     email: em,
  //     password: pwd
  //   }
  //   registryAPI(data).then((res) => {
  //     console.log(res);
  //   })

  // }
  let email;
  let password;
  const [form] = Form.useForm();
  return (
    <div>
      <div className='return'>
        <Link to='/main/login'>
          <Button className='return-button'>
            <ArrowLeftOutlined />
          </Button>
        </Link>
      </div>
      <div className='register-title'>
        <p>注册</p>
      </div>
      <Form
        style={{ margin: "auto", paddingTop: 40, width: 600 }}
        form={form}
        layout='horizontal'
        className='register-form'
        initialValues={{
          remember: true,
          email: email,
          password: password
        }}
      // onFinish={toRegister}
      // onFinishFailed={onFinishFailed}
      >
        <p>邮箱地址</p>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: "邮箱地址不能为空"
            }
          ]}
        >
          <Input className='register-input' placeholder='请输入邮箱地址' />
        </Form.Item>
        <p>用户名</p>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: "用户名不能为空"
            }
          ]}
        >
          <Input className='register-input' placeholder='请输入用户名' />
        </Form.Item>
        <p>密码</p>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: "密码不能为空"
            }
          ]}
        >
          <Input
            className='register-input'
            type='password'

            placeholder='请输入密码'
          />
        </Form.Item>
        <p>邀请码</p>
        <Form.Item name='invitation-code'>
          <Input
            className='register-input'
            placeholder='请输入邀请码（非必要）'
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Button
            className='register-button'
          // onClick={submit}
          // htmlType='submit'
          >
            <p>注册 →</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
