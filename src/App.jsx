import React from "react";
import "./index.css";
import ResizeHtmlFontSize from "./utils/changeFontSize";

import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  ResizeHtmlFontSize();
  return <div>{useRoutes(routes)}</div>;
};
export default App;
