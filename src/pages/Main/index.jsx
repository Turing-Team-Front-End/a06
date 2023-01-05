import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import logo from "../../assets/turingLogo2.svg";
import welcome from "../../assets/welcome.png";
export default function Main() {
  return (
    <div>
      <div className='main'>
        <div className='sidebar'>
          <div className='app-intro'>
            <div className='app-logo'>
              <img src={logo} alt='' />
            </div>
            <div className='app-name'>Turing OSS</div>
          </div>
          <div className='welcome'>
            <img src={welcome} alt='' />
          </div>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
