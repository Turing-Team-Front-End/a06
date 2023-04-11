import React from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import "./index.css"
import { doLoginAPI } from "../../request/api/login"
import { Link, useNavigate } from "react-router-dom"
export default function Login() {
  let email
  let password
  const [form] = Form.useForm()
  let navigate = useNavigate()
  const toLogin = async (values) => {
    let data = {
      email: values.email,
      password: values.password
    }
    try {
      let res = await doLoginAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("登陆成功！")
        navigate("/home")
        window.sessionStorage.setItem("token", res.data.data)
      } else if (res.data.code === 500) {
        message.error("用户名或密码错误！")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }
  return (
    <div>
      <div className='login-title'>
        <p>登录</p>
      </div>
      <Form
        style={{ margin: "auto", paddingTop: 40, width: "30vw" }}
        form={form}
        layout='horizontal'
        className='login-form'
        initialValues={{
          remember: true,
          email: email,
          password: password
        }}
        onFinish={toLogin}
        onFinishFailed={onFinishFailed}
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
          <Input className='login-input' placeholder='请输入邮箱地址' />
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
            className='login-input'
            type='password'
            placeholder='请输入密码'
          />
        </Form.Item>
        <Form.Item className='extra-option'>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox className='remember'>自动登录</Checkbox>
          </Form.Item>
          <Link className='forget' to='/main/reset'>
            忘记密码
          </Link>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='login-button' htmlType='submit'>
            <p>登录 →</p>
          </Button>
          {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Link to='/main/register'>创建账户</Link>
        </Form.Item>
      </Form>
    </div>
  )
}
