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
      totalSize: 0
    }
    try {
      let res = await bucketAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("创建成功！")
        window.location.reload()
      } else if (res.data.code === 500) {
        message.error("创建失败！" + res.data.msg)
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
        style={{ margin: "auto", paddingTop: 40, width: "40vw" }}
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
        <p>Bucket名</p>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: "Bucket名不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='请输入Bucket名' />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='create-button' htmlType='submit'>
            <p>创建Bucket</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
