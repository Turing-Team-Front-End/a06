import { Navigate } from 'react-router-dom'
import Home from '../pages/Home/'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index'
import Site from '../pages/Site'
import User from '../pages/User'

// 路由映射表 
const routes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'index',
                element: <Index />,
            },
            {
                path: 'site',
                element: <Site />,
            },
            {
                path: 'user',
                element: <User />,
            },
            {
                path: '',
                element: <Navigate to='index' />
            }
        ]

    },
    // 路由重定向
    {
        path: '/',
        element: <Navigate to='/login' />
    }
]
export default routes