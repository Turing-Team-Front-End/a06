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
      <div className='login-title'>
        <p>setUserPrivilege</p>
      </div>
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
        <p>username</p>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: "username不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入username' />
        </Form.Item>
        <p>privilege</p>
        <Form.Item
          name='privilege'
          rules={[
            {
              required: true,
              message: "privilege不能为空"
            }
          ]}
        >
          <Input
            className='login-input'
            placeholder='请输入privilege,只能为rw或r'
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='login-button' htmlType='submit'>
            <p>Set →</p>
          </Button>
          {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
