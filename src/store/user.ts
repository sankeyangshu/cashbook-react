import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userInfoType } from '@/types/user';

/**
 * 用户信息store类型
 */
export interface usersStoreType {
  token: string;
  userInfo: userInfoType;
  setToken(value: string): void;
  setUserInfo: (value: userInfoType) => void;
}

export const useUserStore = create<usersStoreType>()(
  persist(
    (set) => ({
      token: '', // 登录token
      userInfo: {
        avatar: '', // 用户头像
        username: '', // 昵称
        signature: '', // 个性签名
      },

      // 设置token
      setToken: (value: string) => set({ token: value }),

      // 设置用户信息
      setUserInfo: (value: userInfoType) => set({ userInfo: value }),
    }),
    {
      // 进行持久化存储
      name: 'userStorage', // 本地存储的名称
      storage: createJSONStorage(() => localStorage), // 保存的位置
    }
  )
);
