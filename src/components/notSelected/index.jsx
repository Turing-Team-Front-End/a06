import React from "react";

import "./index.css";

function notSelected() {
  return (
    <div>
      <div className='not-icon'>
        <div className='not-icon1'></div>
        <div className='not-icon2'></div>
        <div className='not-icon3'></div>
      </div>
      <div className='not-text'>未选中bucket</div>
    </div>
  );
}

export default notSelected;
