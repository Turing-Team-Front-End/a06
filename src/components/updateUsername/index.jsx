import React from "react"
import { Button, Form, Input, message } from "antd"
import { updateAPI } from "../../request/api/user"
export default function updateUsername() {
  let username
  const [form] = Form.useForm()
  const toUpdate = async (values) => {
    let data = {
      username: values.username
    }
    try {
      let res = await updateAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("更新成功！")
      } else if (res.data.code === 500) {
        message.error("更新失败！")
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
          username: username
        }}
        onFinish={toUpdate}
        onFinishFailed={onFinishFailed}
      >
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
          <Input className='login-input' placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>修改用户名</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
