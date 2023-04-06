import React from "react"
import { Button, Form, Input, message } from "antd"
import "./index.css"
import { bucketAPI } from "../../request/api/bucket"
export default function createBucket() {
  let name
  let totalSize
  const [form] = Form.useForm()
  const toCreate = async (values) => {
    let data = {
      name: values.name,
      totalSize: values.totalSize
    }
    try {
      let res = await bucketAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("创建成功！")
      } else if (res.data.code === 500) {
        message.error("创建失败！")
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
        <p>createBucket</p>
      </div>
      <Form
        style={{ margin: "auto", paddingTop: 40, width: 600 }}
        form={form}
        layout='horizontal'
        className='login-form'
        initialValues={{
          remember: true,
          name: name,
          totalSize: totalSize
        }}
        onFinish={toCreate}
        onFinishFailed={onFinishFailed}
      >
        <p>name</p>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: "name不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入name' />
        </Form.Item>
        <p>totalSize</p>
        <Form.Item
          name='totalSize'
          rules={[
            {
              required: true,
              message: "totalSize不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入totalSize' />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='login-button' htmlType='submit'>
            <p>Create →</p>
          </Button>
          {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
