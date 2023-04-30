import React, { useEffect, useState } from "react"
import { Button, Modal } from "antd"
import closeIcon from "../../assets/close.svg"

import "./index.css"
const modalBody = {
  backgroundColor: "#f4f5fb"
}
function popover(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {})
  return (
    <>
      <div onClick={showModal}>{props.mode}</div>
      <Modal
        // title='Basic Modal'
        centered
        bodyStyle={modalBody}
        open={isModalOpen}
        width={"70vw"}
        closable={false}
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

          <div className='popover-title'>{props.name}</div>
          <div className='popover-close'>
            <img src={closeIcon} alt='' onClick={handleCancel} />
          </div>
        </div>
        <div className='popover-content'>{props.content}</div>
      </Modal>
    </>
  )
}
export default popover
