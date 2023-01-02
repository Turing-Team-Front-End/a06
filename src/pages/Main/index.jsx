import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function Main() {
  return (
    <div>
      <div className='main'>
        <div className='sidebar'>
          <div className='app-intro'>
            <div className='app-logo'></div>
            <div className='app-name'>Turing OSS</div>
          </div>
          <div className='welcome'>
            <div className='hello'>你好</div>
            <div className='greeting'>欢迎使用 Turing OSS</div>
          </div>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
