/**
 * 登录请求参数类型
 */
export type loginDataType = {
  username: string;
  password: string;
};

/**
 * 用户信息类型
 */
export interface userInfoType {
  avatar: string;
  signature: string;
  username: string;
}
