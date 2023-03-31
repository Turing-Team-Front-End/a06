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
            let res = await updateAPI(data);
            console.log(res);
            if (res.data.code === 200) {
                message.success("更新成功！")

            } else if (res.data.code === 500) {
                message.error("更新失败！")
            }
        } catch (error) {
            console.error(error);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }
    return (
        <div>
            <div className='login-title'>
                <p>updateEmail</p>
            </div>
            <Form
                style={{ margin: "auto", paddingTop: 40, width: 600 }}
                form={form}
                layout='horizontal'
                className='login-form'
                initialValues={{
                    remember: true,
                    email: email,
                }}
                onFinish={toUpdate}
                onFinishFailed={onFinishFailed}
            >
                <p>email</p>
                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: "email不能为空"
                        }
                    ]}
                >
                    <Input className='login-input' placeholder='请输入email' />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button className='login-button' htmlType='submit'>
                        <p>Update →</p>
                    </Button>
                    {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
                </Form.Item>
            </Form>
        </div>
    )
}

