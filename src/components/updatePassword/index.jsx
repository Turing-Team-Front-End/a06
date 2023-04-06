import React from "react"
import { Button, Form, Input, message } from "antd"
import { updatepasswordAPI } from "../../request/api/user"
export default function updatePassword() {
    let oldPassword
    let newPassword
    const [form] = Form.useForm()
    const toUpdate = async (values) => {
        let data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }
        try {
            let res = await updatepasswordAPI(data);
            console.log(res);
            if (res.data.code === 200) {
                message.success("更新密码成功！")
            } else if (res.data.code === 500) {
                message.error("更新密码失败！")
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
                <p>updatePassword</p>
            </div>
            <Form
                style={{ margin: "auto", paddingTop: 40, width: 600 }}
                form={form}
                layout='horizontal'
                className='login-form'
                initialValues={{
                    remember: true,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }}
                onFinish={toUpdate}
                onFinishFailed={onFinishFailed}
            >
                <p>oldPassword</p>
                <Form.Item
                    name='oldPassword'
                    rules={[
                        {
                            required: true,
                            message: "oldPassword不能为空"
                        }
                    ]}
                >
                    <Input className='login-input' placeholder='请输入oldPassword' />
                </Form.Item>
                <p>newPassword</p>
                <Form.Item
                    name='newPassword'
                    rules={[
                        {
                            required: true,
                            message: "newPassword不能为空"
                        }
                    ]}
                >
                    <Input
                        className='login-input'
                        placeholder='请输入newPassword'
                    />
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

