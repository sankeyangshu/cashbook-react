import { useState } from 'react';
import { Button, Cell, Divider, Image, Input, Toast } from 'react-vant';
import { Icon } from '@iconify/react';
import moduleCss from './index.module.less';

/**
 * 登录和注册类型
 */
type LoginType = 'login' | 'register';

const Login = () => {
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码

  // 登录和注册类型
  const [type, setType] = useState<LoginType>('login');

  // 用户登录和注册
  const onClickSubmit = () => {
    console.log('first');
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
