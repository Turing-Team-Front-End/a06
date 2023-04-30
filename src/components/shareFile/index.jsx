import React, { useEffect } from "react"
import { Button, Form, Input, message } from "antd"
import { shareFileAPI } from "../../request/api/files"
export default function shareFile(props) {
  let expire
  const [form] = Form.useForm()
  const toShare = async (values) => {
    let data = {
      bid: props.record.bid,
      expire: values.expire,
      fileId: props.record.id
    }
    console.log(data)
    try {
      let res = await shareFileAPI(data)
      console.log(res)
      if (res.data.code === 200) {
        navigator.clipboard.writeText(res.data.data)
        message.success("获取分享链接成功,已复制到剪切板！")
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
  useEffect(() => {
    console.log(props.record)
  }, [])
  return (
    <div>
      <Form
        style={{ margin: "auto", paddingTop: 40, width: 600 }}
        form={form}
        layout='horizontal'
        className='login-form'
        initialValues={{
          remember: true,
          expire: expire
        }}
        onFinish={toShare}
        onFinishFailed={onFinishFailed}
      >
        <p>链接过期时间</p>
        <Form.Item
          name='expire'
          rules={[
            {
              required: true,
              message: "过期时间不能为空"
            }
          ]}
        >
          <Input
            className='login-input'
            placeholder='请设置链接过期时间（单位为min）'
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button className='login-button' htmlType='submit'>
            <p>生成分享链接</p>
          </Button>
          {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
