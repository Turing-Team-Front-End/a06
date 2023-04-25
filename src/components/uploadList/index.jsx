import React, { useEffect, useState } from "react"
import "./index.css"
import DeleteWarning from "../deleteWarning"
import { Progress } from "antd"
import pause from "../../assets/pause.svg"
import abort from "../../assets/abort.svg"

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
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className='list-item'>
          <div className='list-item-left'>
            {item.name}
            {item.percent === 100 ? (
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
            <img src={abort} alt='' />
          </div>
        </div>
      ))}
    </div>
  )
}
export default uploadList
