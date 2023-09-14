import { useRoutes, RouteObject } from 'react-router-dom';
import Home from '@/views/Home';
import Data from '@/views/Data';
import User from '@/views/User';
import Login from '@/views/Login';
import Detail from '@/views/Detail';

/**
 * 公共路由
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'Home',
    element: <Home />,
  },
  {
    path: '/data',
    id: 'Data',
    element: <Data />,
  },
  {
    path: '/user',
    id: 'User',
    element: <User />,
  },
  {
    path: '/login',
    id: 'Login',
    element: <Login />,
  },
  {
    path: '/detail',
    id: 'Detail',
    element: <Detail />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default router;
