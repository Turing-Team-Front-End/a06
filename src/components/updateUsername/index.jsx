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
            let res = await updateAPI(data);
            console.log(res);
            if (res.data.code === 200) {
                message.success("创建成功！")

            } else if (res.data.code === 500) {
                message.error("创建失败！")
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
                <p>updateUsername</p>
            </div>
            <Form
                style={{ margin: "auto", paddingTop: 40, width: 600 }}
                form={form}
                layout='horizontal'
                className='login-form'
                initialValues={{
                    remember: true,
                    username: username,
                }}
                onFinish={toUpdate}
                onFinishFailed={onFinishFailed}
            >
                <p>name</p>
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

