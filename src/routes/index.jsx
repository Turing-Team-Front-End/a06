import { Navigate } from 'react-router-dom'
import Main from '../pages/Main'
import Home from '../pages/Home/'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index'
import Site from '../pages/Site'
import User from '../pages/User'
import Document from '../pages/Document'
import Reset from '../pages/Reset'


// 路由映射表 
const routes = [
    {   //第一屏页面
        path: '/main',
        element: <Main />,
        children: [
            {   //登录
                path: 'login',
                element: <Login />,
            },
            {   //注册
                path: 'register',
                element: <Register />,
            },
            {   //重置密码
                path: 'reset',
                element: <Reset />,
            },
            {   //重定向到登录页面
                path: '',
                element: <Navigate to='login' />
            }
        ]
    },
    {   //主页面
        path: '/home',
        element: <Home />,
        children: [
            {   //主页面的主页
                path: 'index',
                element: <Index />,
            },
            {   //主页面的设置页
                path: 'site',
                element: <Site />,
            },
            {   //主页面的用户管理页
                path: 'user',
                element: <User />,
            },
            {   //主页面的文件管理页
                path: 'document',
                element: <Document />,
            },
            {   //主页面的重定向
                path: '',
                element: <Navigate to='index' />
            }
        ]

    },
    // 路由重定向
    {
        path: '/',
        element: <Navigate to='/main' />
    }
]
export default routes