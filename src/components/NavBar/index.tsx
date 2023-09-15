import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { Icon } from '@iconify/react';

const NavBar = () => {
  // 获取路由对象
  const navigate = useNavigate();
  const location = useLocation();

  // 获取当前路由路径
  const { pathname } = location;
  // 需要显示底部导航栏的路由
  const needShowNav = ['/', '/data', '/user'];
  // 是否显示底部导航栏
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(needShowNav.includes(pathname));
    if (needShowNav.includes(pathname) && pathname !== activeKey) {
      setActiveKey(pathname);
    }
  }, [pathname]);

  // 当前选中的导航
  const [activeKey, setActiveKey] = useState('');

  // 设置当前选中的导航
  const onChangeTab = (path: string) => {
    setActiveKey(path);
    navigate(path);
  };

  return (
    <>
      {showNav && (
        <Tabbar value={activeKey} onChange={(value) => onChangeTab(value as string)}>
          <Tabbar.Item name="/" icon={<Icon icon="ri:file-list-3-line" />}>
            账单
          </Tabbar.Item>
          <Tabbar.Item name="/data" icon={<Icon icon="fluent:data-pie-24-regular" />}>
            统计
          </Tabbar.Item>
          <Tabbar.Item name="/user" icon={<Icon icon="material-symbols:person-2-outline" />}>
            我的
          </Tabbar.Item>
        </Tabbar>
      )}
    </>
  );
};

export default NavBar;
