import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { Icon } from '@iconify/react';

/**
 * 导航
 */
interface NavBarProps {
  /**
   * 是否显示导航栏
   */
  showNav: boolean;
}

const NavBar: FC<NavBarProps> = ({ showNav }) => {
  // 当前选中的导航
  const [activeKey, setActiveKey] = useState('/');

  // 获取路由对象
  const navigate = useNavigate();

  // 设置当前选中的导航
  const onChangeTab = (path: string) => {
    setActiveKey(path);
    navigate(path);
  };

  return (
    <>
      {showNav && (
        <Tabbar value={activeKey} onChange={(value) => onChangeTab(value as string)}>
          <Tabbar.Item icon={<Icon icon="ri:file-list-3-line" />}>账单</Tabbar.Item>
          <Tabbar.Item icon={<Icon icon="fluent:data-pie-24-regular" />}>统计</Tabbar.Item>
          <Tabbar.Item icon={<Icon icon="material-symbols:person-2-outline" />}>我的</Tabbar.Item>
        </Tabbar>
      )}
    </>
  );
};

export default NavBar;
