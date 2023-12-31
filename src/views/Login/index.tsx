import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Cell, Divider, Image, Input, Toast } from 'react-vant';
import { Icon } from '@iconify/react';
import { postLoginAPI, postRegisterAPI, getUserInfoAPI } from '@/api/user';
import { useUserStore } from '@/store/user';
import moduleCss from './index.module.less';

/**
 * 登录和注册类型
 */
type LoginType = 'login' | 'register';

const Login: FC = () => {
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码

  // 登录和注册类型
  const [type, setType] = useState<LoginType>('login');

  // 获取全局仓库中用户状态
  const [setToken, setUserInfo] = useUserStore((state) => [state.setToken, state.setUserInfo]);

  // 路由对象
  const navigate = useNavigate();

  // 用户登录和注册
  const onClickSubmit = async () => {
    if (!username) {
      Toast.info('请输入账号');
      return;
    }
    if (!password) {
      Toast.info('请输入密码');
      return;
    }

    try {
      // 判断是否是登录
      if (type === 'login') {
        const { data } = await postLoginAPI({ username, password });
        // 保存用户token
        setToken(data.token);
        // 获取用户信息
        const { data: userInfo } = await getUserInfoAPI();
        setUserInfo(userInfo);
        navigate('/');
        Toast.success('登录成功');
      } else {
        await postRegisterAPI({ username, password });
        Toast.success('注册成功');
        // 注册成功切换到登录
        setType('login');
      }
    } catch (error: any) {
      Toast.fail(error.msg);
    }
  };

  // 其他登录
  const onClickOtherLogin = (other: string) => {
    Toast.info(`暂不支持使用${other}登录`);
  };

  return (
    <div className={moduleCss.login}>
      <div className={moduleCss.header}>
        <Image
          width="100"
          height="100"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
      </div>
      <div className={moduleCss.tab}>
        <span className={type === 'login' ? moduleCss.active : ''} onClick={() => setType('login')}>
          登录
        </span>
        <span
          className={type === 'register' ? moduleCss.active : ''}
          onClick={() => setType('register')}
        >
          注册
        </span>
      </div>
      <div className={moduleCss.form}>
        <Cell>
          <Input
            value={username}
            onChange={(value) => setUsername(value)}
            prefix={<Icon icon="material-symbols:person" fontSize={24} />}
            placeholder="请输入账号"
            clearable
            clearTrigger="focus"
          />
        </Cell>
        <Cell>
          <Input
            value={password}
            onChange={(value) => setPassword(value)}
            prefix={<Icon icon="material-symbols:lock" fontSize={24} />}
            type="password"
            placeholder="请输入密码"
            clearable
            clearTrigger="focus"
          />
        </Cell>
        <div className={moduleCss.btn}>
          <Button round size="large" type="primary" color="#597fe7" onClick={onClickSubmit}>
            {type === 'login' ? '登录' : '注册'}
          </Button>
        </div>
      </div>
      <div className={moduleCss['login-other']}>
        <Divider>其他方式</Divider>
        <div className={moduleCss['other-icon']}>
          <Icon
            icon="fa:wechat"
            fontSize={30}
            color="#83dc42"
            style={{ marginRight: '24px' }}
            onClick={() => onClickOtherLogin('微信')}
          />
          <Icon
            icon="fa:weibo"
            fontSize={30}
            color="#f9221d"
            style={{ marginRight: '24px' }}
            onClick={() => onClickOtherLogin('微博')}
          />
          <Icon
            icon="fa:github"
            fontSize={30}
            color="#24292e"
            onClick={() => onClickOtherLogin('github')}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
