import React from "react"
import { Button, Form, Input, message, Select } from "antd"
import { updateResponseHeaderAPI } from "../../request/api/respHeaderCtrl"
import { useState } from "react"
import { useEffect } from "react"
export default function updateResponseHeader(props) {
  useEffect(() => console.log(props))
  const [form] = Form.useForm()
  const toUpdate = async (values) => {
    // let data = new FormData()
    // data.append("id", props.record.id)
    // data.append("bid", props.record.bid)
    // data.append("respHeader", values.respheader)
    // data.append("value", values.value)
    let data = {
      id: props.record.id,
      uid: props.record.uid,
      respheader: values.respheader,
      value: values.value
    }
    try {
      let res = await updateResponseHeaderAPI(data)
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
        onFinish={toUpdate}
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='update-button' htmlType='submit'>
            <p>更新</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
