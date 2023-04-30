import React from "react"
import { Button, Form, Input, message } from "antd"
import { updateAPI } from "../../request/api/user"
export default function updateEmail() {
  let email
  const [form] = Form.useForm()
  const toUpdate = async (values) => {
    let data = {
      email: values.email
    }
    try {
      let res = await updateAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("更新成功！")
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else if (res.data.code === 500) {
        message.error("更新失败！" + res.data.msg)
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
          email: email
        }}
        onFinish={toUpdate}
        onFinishFailed={onFinishFailed}
      >
        <p>新邮箱</p>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: "新邮箱不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入新邮箱' />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>修改邮箱</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
