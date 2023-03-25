import React, { useEffect, useState } from "react"
import { Radio, Button } from 'antd';
import "./index.css"

function compressionSite(props) {
  useEffect(() => {
    console.log(props)
  })
  return <>
    <div className="compressionSite-content">
      <div className="compressionSite-content-main">
        <div className="compressionSite-content-main-img">
          <div className="compressionSite-content-main-img-title">图片压缩</div>
          <div className="compressionSite-content-main-img-site">
            <div className="compressionSite-content-main-img-site-top">
              <Radio.Group defaultValue="a" size="large" buttonStyle="solid">
                <Radio.Button value="a">无损</Radio.Button>
                <Radio.Button value="b">高</Radio.Button>
                <Radio.Button value="c">中</Radio.Button>
                <Radio.Button value="d">低</Radio.Button>
              </Radio.Group>
            </div>
            <div className="compressionSite-content-main-img-site-foot">注:无损仅支持PNG格式</div>
          </div>
        </div>
        <div className="compressionSite-content-main-img">
          <div className="compressionSite-content-main-img-title">视频压缩</div>
          <div className="compressionSite-content-main-img-site">
            <div className="compressionSite-content-main-img-site-top">
              <Radio.Group defaultValue="a" size="large" buttonStyle="solid">
                <Radio.Button value="a">2K</Radio.Button>
                <Radio.Button value="b">1080P</Radio.Button>
                <Radio.Button value="c">720P</Radio.Button>
                <Radio.Button value="d">480P</Radio.Button>
                <Radio.Button value="e">360P</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="compressionSite-foot">
      <Button className="compressionSite-foot-canel">取消</Button>
      <Button type='text' className="compressionSite-foot-save">保存设置</Button>
    </div>
  </>
}
export default compressionSite
