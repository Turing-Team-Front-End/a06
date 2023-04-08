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
            fileld: props.record.id
        }
        console.log(data);
        try {
            let res = await shareFileAPI(data);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }
    useEffect(() => {
        console.log(props.record);
    }, [])
    return (
        <div>
            <div className='login-title'>
                <p>setExpire</p>
            </div>
            <Form
                style={{ margin: "auto", paddingTop: 40, width: 600 }}
                form={form}
                layout='horizontal'
                className='login-form'
                initialValues={{
                    remember: true,
                    expire: expire,
                }}
                onFinish={toShare}
                onFinishFailed={onFinishFailed}
            >
                <p>expire</p>
                <Form.Item
                    name='expire'
                    rules={[
                        {
                            required: true,
                            message: "expire不能为空"
                        }
                    ]}
                >
                    <Input className='login-input' placeholder='请输入expire' />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button className='login-button' htmlType='submit'>
                        <p>share →</p>
                    </Button>
                    {/* <Button shape='round' htmlType='button' onClick={onReset}>
            重置
          </Button> */}
                </Form.Item>
            </Form>
        </div>
    )
}

