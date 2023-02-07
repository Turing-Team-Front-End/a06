import React, { useEffect, useState } from "react"
import { Button, Modal } from "antd"
import closeIcon from "../../assets/close.svg"
import deleteIcon from "../../assets/delete-warning.svg"

import "./index.css"

const modalBody = {
  backgroundColor: "#fefbff"
}
function deleteWarning(props) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    console.log(props)
  })
  return (
    <>
      <div onClick={showModal}>{props.mode}</div>
      <Modal
        className='test'
        bodyStyle={modalBody}
        open={isModalOpen}
        width={"33.3vw"}
        closable={false}
        centered={true}
        footer={null}
      >
        <div className='popover-top'>
          <div className='popover-button-space'>
            <Button
              className='popover-button'
              type='text'
              style={{ display: props.button ? "" : "none" }}
            >
              保存设置
            </Button>
          </div>

          <div className='delete-title'>{props.name}</div>
          <div className='popover-close'>
            <img src={closeIcon} alt='' onClick={handleCancel} />
          </div>
        </div>
        <div className='delete-content'>
          <img src={deleteIcon} alt='' />
          <p>确认要进行此操作吗?</p>
        </div>
        <div className='delete-bottom'>
          <Button className='delete-ok' type='text' onClick={handleCancel}>
            确认
          </Button>
          <Button className='delete-cancel' type='text' onClick={handleCancel}>
            取消
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default deleteWarning
