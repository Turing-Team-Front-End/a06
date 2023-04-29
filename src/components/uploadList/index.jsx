import React, { useEffect, useState } from "react"
import "./index.css"
import { Progress, Popconfirm, Empty, message } from "antd"
import pause from "../../assets/pause.svg"
import abort from "../../assets/abort.svg"
import { abortAPI } from "../../request/api/upload"
function uploadList(props) {
  const [data, setData] = useState(props.data)

  useEffect(() => {
    setData(props.data)
  }, [props])
  const test1 = (item) => {
    console.log(item)
    item.percent = 50
    setData([...data])
  }
  const abortUpload = (item) => {
    if (item.percent === 100) {
      let x = data.filter((d) => d !== item)
      setData(x)
      props.onDataUpdate(x)
    } else {
      abortAPI(item.md5).then((res) => {
        // console.log(res)
        if (item.percent === 100) {
          message.info("上传已完成，无法取消！")
          return
        }
        if (res.data.code === 200) {
          message.success("上传已取消！")
        } else if (res.data.code === 500) {
          message.error(res.data.msg)
        }
      })
    }
  }
  return (
    <div>
      {data.length === 0 ? (
        <Empty description='暂无上传任务' />
      ) : (
        data.map((item, index) => (
          <div key={index} className='list-item'>
            <div className='list-item-left'>
              {item.name}
              {item.exception ? (
                <span className='exception'>未完成</span>
              ) : item.percent === 100 ? (
                <span className='complete'>已完成</span>
              ) : (
                <span className='uploading'>上传中</span>
              )}
            </div>
            <div className='list-item-middle'>
              <Progress
                percent={item.percent}
                status={item.exception ? "exception" : ""}
              />
            </div>
            <div className='list-item-right'>
              <img src={pause} alt='' onClick={() => test1(item)} />
              <Popconfirm
                placement='rightBottom'
                title={
                  item.percent === 100
                    ? "已上传完毕，清除该条记录？"
                    : "是否放弃上传？"
                }
                onConfirm={() => abortUpload(item)}
                okText='确认'
                cancelText='取消'
              >
                <img src={abort} alt='' />
              </Popconfirm>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
export default uploadList
