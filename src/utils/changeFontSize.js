import { throttle } from "lodash";

function resizeFunc() {
  // 高度
  const newHeightFontSize = ((window.innerHeight / 930) * 14).toFixed(2);
  const newWidthFontSize = ((window.innerWidth / 1920) * 14).toFixed(2);
  const result = window.innerWidth > 700 ? newHeightFontSize : newWidthFontSize;
  document
    .querySelector("html")
    .setAttribute("style", "font-size:" + result + "px");
}

const ResizeHtmlFontSize = () => {
  resizeFunc();
  window.addEventListener("resize", throttle(resizeFunc, 500));
};

export default ResizeHtmlFontSize;
