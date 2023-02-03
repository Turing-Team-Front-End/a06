import React, { useEffect, useState } from "react"
import "./index.css"

function taskList(props) {
  useEffect(() => {
    console.log(props)
  })
  return <>
    <p>我是任务列表</p>
  </>
}
export default taskList
