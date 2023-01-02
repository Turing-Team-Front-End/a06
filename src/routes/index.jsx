import { Navigate } from 'react-router-dom'
import Home from '../pages/Home/'
import Login from '../pages/Login'
// 路由映射表 
const routes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    // 路由重定向
    {
        path: '/',
        element: <Navigate to='/login' />
    }
]
export default routes