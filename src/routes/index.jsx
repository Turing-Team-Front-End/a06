import { Navigate } from "react-router-dom"
import Main from "../pages/Main"
import Home from "../pages/Home/"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Bucket from "../pages/Bucket"
import Site from "../pages/Site"
import Reset from "../pages/Reset"
import BucketDetail from "../pages/BucketDetail"
import BucketMain from "../pages/BucketMain"

// 路由映射表
const routes = [
  {
    //第一屏页面
    path: "/main",
    element: <Main />,
    children: [
      {
        //登录
        path: "login",
        element: <Login />
      },
      {
        //注册
        path: "register",
        element: <Register />
      },
      {
        //重置密码
        path: "reset",
        element: <Reset />
      },
      {
        //重定向到登录页面
        path: "",
        element: <Navigate to='login' />
      }
    ]
  },
  {
    //主页面
    path: "/home",
    element: <Home />,
    children: [
      {
        //主页面的主页
        path: "bucket",
        element: <Bucket />,
        children: [
          {
            path: "main",
            element: <BucketMain />
          },
          {
            path: ":bid/:name",
            element: <BucketDetail />
          },
          {
            //重定向到登录页面
            path: "",
            element: <Navigate to='main' />
          }
        ]
      },
      {
        //主页面的设置页
        path: "site",
        element: <Site />
      },
      {
        //主页面的重定向
        path: "",
        element: <Navigate to='bucket' />
      }
    ]
  },
  // 路由重定向
  {
    path: "/",
    element: <Navigate to='/main' />
  }
]
export default routes
