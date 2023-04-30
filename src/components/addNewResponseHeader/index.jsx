import React from "react"
import { Button, Form, Input, message, Select } from "antd"
import { addResponseHeaderAPI } from "../../request/api/respHeaderCtrl"
import { useState } from "react"
export default function addNewResponseHeader() {
  let email
  const [form] = Form.useForm()
  const [allowRepeat, setAllowRepeat] = useState(false)
  const batchChange = (value) => {
    console.log(value)
    setAllowRepeat(value.value)
  }
  const toAdd = async (values) => {
    let data = {
      respHeader: values.respheader,
      value: values.value,
      allowRepeat: allowRepeat
    }
    try {
      let res = await addResponseHeaderAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        message.success("添加成功！")
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else if (res.data.code === 500) {
        message.error("添加失败！" + res.data.msg)
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
        onFinish={toAdd}
        onFinishFailed={onFinishFailed}
      >
        <p>响应头名称</p>
        <Form.Item
          name='respheader'
          rules={[
            {
              required: true,
              message: "响应头名称不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='自定义响应头名称' />
        </Form.Item>
        <p>响应头值</p>
        <Form.Item
          name='value'
          rules={[
            {
              required: true,
              message: "响应头值不能为空"
            }
          ]}
        >
          <Input className='login-input' placeholder='响应头值' />
        </Form.Item>
        <p>是否允许重复</p>
        <Form.Item>
          <Select
            className='dropdown'
            defaultValue={{
              value: false,
              label: "否"
            }}
            bordered={false}
            labelInValue
            onChange={batchChange}
            options={[
              {
                value: true,
                label: "是"
              },
              {
                value: false,
                label: "否"
              }
            ]}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>添加</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
