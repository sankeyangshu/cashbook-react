import { useUserStore } from '@/store/user';
import { Cell, Toast } from 'react-vant';
import mCss from './index.module.less';

const User = () => {
  // 获取全局仓库中用户信息
  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <div className={mCss.user}>
      <div className={mCss.head}>
        <div className={mCss.info}>
          <span>{userInfo.username || ''}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
            />
            <b>{userInfo.signature || '暂无个性签名'}</b>
          </span>
        </div>
        <img
          className={mCss.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={userInfo.avatar || '//s.yezgea02.com/1624959897466/avatar.jpeg'}
        />
      </div>
      <div className={mCss.content}>
        <Cell
          isLink
          title="用户信息"
          onClick={() => Toast.info('用户信息')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/gxqm.png"
            />
          }
        />
        <Cell
          isLink
          title="重置密码"
          onClick={() => Toast.info('重置密码')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/zhaq.png"
            />
          }
        />
        <Cell
          isLink
          title="关于我们"
          onClick={() => Toast.info('关于我们')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615975178434/lianxi.png"
            />
          }
        />
      </div>
    </div>
  );
};

export default User;
