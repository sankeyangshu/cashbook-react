import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { Cell, Toast, Image } from 'react-vant';
import { UserO } from '@react-vant/icons';
import { Icon } from '@iconify/react';
import mCss from './index.module.less';

const User = () => {
  // 获取全局仓库中用户信息
  const [userInfo, setToken, setUserInfo] = useUserStore((state) => [
    state.userInfo,
    state.setToken,
    state.setUserInfo,
  ]);

  // 路由
  const navigateTo = useNavigate();

  // 退出登录
  const onClickLogout = () => {
    setToken('');
    setUserInfo({
      avatar: '',
      username: '',
      signature: '',
    });
    navigateTo('/login');
  };

  return (
    <div className={mCss.user}>
      <img className={mCss.head} src="//s.yezgea02.com/1615971681107/%E4%BD%8D%E5%9B%BE%402x.png" />
      <div className={mCss.info}>
        <Image className={mCss.avatar} src={userInfo.avatar} />
        <div className={mCss.right}>
          <div className={mCss.nickname}>{userInfo.username || ''}</div>
          <div className={mCss.signature}>{userInfo.signature || '暂无个性签名'}</div>
        </div>
      </div>
      <div className={mCss.content}>
        <Cell
          isLink
          title="用户信息"
          onClick={() => Toast.info('用户信息')}
          icon={<UserO style={{ width: 20, verticalAlign: '-7px' }} color="#597fe7" />}
        />
        <Cell
          isLink
          title="重置密码"
          onClick={() => Toast.info('重置密码')}
          icon={
            <Icon
              icon="material-symbols:admin-panel-settings-outline"
              style={{ width: 20, verticalAlign: '-7px' }}
              color="#3db548"
            />
          }
        />
        <Cell
          isLink
          title="关于我们"
          onClick={() => Toast.info('关于我们')}
          icon={
            <Icon
              icon="mdi:account-heart-outline"
              style={{ width: 20, verticalAlign: '-7px' }}
              color="#d81d1d"
            />
          }
        />
        <Cell
          isLink
          title="退出登录"
          onClick={onClickLogout}
          icon={
            <Icon
              icon="ic:round-log-out"
              style={{ width: 20, verticalAlign: '-7px' }}
              color="#7cc146"
            />
          }
        />
      </div>
    </div>
  );
};

export default User;
