import React from "react";
import "./index.css";

import { useRoutes } from "react-router-dom";
import routes from "./routes";

export default function App() {
  return <div>{useRoutes(routes)}</div>;
}
