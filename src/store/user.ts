import { create } from 'zustand';

/**
 * 用户信息store类型
 */
export interface usersStoreType {
  token: string;
  setToken(value: string): void;
}

export const useUserStore = create<usersStoreType>()((set) => ({
  token: '', // 登录token

  // 设置token
  setToken: (value: string) => set({ token: value }),
}));
