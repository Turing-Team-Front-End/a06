import React, { useEffect } from "react"
import { Button, Form, Input, message } from "antd"
import { setBucketPrivilegeAPI } from "../../request/api/bucketPrivilege"
export default function setUserPrivilege(props) {
  let username
  let privilege
  const [form] = Form.useForm()
  const toSet = async (values) => {
    username = values.username
    let data = {
      bid: props.bid,
      privilege: values.privilege
    }
    try {
      let res = await setBucketPrivilegeAPI(username, data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("设置用户权限成功！")
      } else if (res.data.code === 500) {
        message.error(res.data.msg)
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
          username: username,
          privilege: privilege
        }}
        onFinish={toSet}
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
          <Input
            className='login-input'
            placeholder='请输入需赋予权限的用户名'
          />
        </Form.Item>
        <p>权限</p>
        <Form.Item
          name='privilege'
          rules={[
            {
              required: true,
              message: "设置权限不能为空"
            }
          ]}
        >
          <Input
            className='login-input'
            placeholder='请输入需要设置的权限种类,只能为rw或r'
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>设置权限</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
