import React from "react"
import { Button, Form, Input, message } from "antd"
import { updatepasswordAPI } from "../../request/api/user"
import "./index.css"
export default function updatePassword() {
  let oldPassword
  let newPassword
  const [form] = Form.useForm()
  const toUpdate = async (values) => {
    let data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    }
    try {
      let res = await updatepasswordAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("更新密码成功！")
      } else if (res.data.code === 500) {
        message.error("更新密码失败！" + res.data.msg)
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
      <Form
        style={{ margin: "auto", paddingTop: 40, width: 600 }}
        form={form}
        layout='horizontal'
        className='login-form'
        initialValues={{
          remember: true,
          oldPassword: oldPassword,
          newPassword: newPassword
        }}
        onFinish={toUpdate}
        onFinishFailed={onFinishFailed}
      >
        <p>旧密码</p>
        <Form.Item
          name='oldPassword'
          rules={[
            {
              required: true,
              message: "旧密码不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入旧密码' />
        </Form.Item>
        <p>新密码</p>
        <Form.Item
          name='newPassword'
          rules={[
            {
              required: true,
              message: "新密码不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入新密码' />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>修改密码</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
