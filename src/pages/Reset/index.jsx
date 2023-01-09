import React from "react";
import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.css";
import { Link } from "react-router-dom";
export default function Reset() {
  let email;
  let password;
  const [form] = Form.useForm();
  return (
    <div>
      <div className='return'>
        <Link to='/main/login'>
          <Button className='return-button'>
            <ArrowLeftOutlined />
          </Button>
        </Link>
      </div>
      <div className='reset-title'>
        <p>密码重置</p>
      </div>
      <Form
        style={{ margin: "auto", paddingTop: 40, width: 600 }}
        form={form}
        layout='horizontal'
        className='reset-form'
        initialValues={{
          remember: true,
          email: email,
          password: password
        }}
        // onFinish={toreset}
        // onFinishFailed={onFinishFailed}
      >
        <p>邮箱地址</p>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: "邮箱地址不能为空"
            }
          ]}
        >
          <Input className='reset-input' placeholder='请输入邮箱地址' />
        </Form.Item>
        <p>新密码</p>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: "新密码不能为空"
            }
          ]}
        >
          <Input
            className='reset-input'
            type='password'
            placeholder='请输入新密码'
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Button
            className='reset-button'
            // htmlType='submit'
          >
            <p>提交 →</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
