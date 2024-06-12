import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import {
  ADMIN_PERMISSION,
  MANAGERS_PERMISSION,
  STAFF_PERMISSION,
} from '@/router/constant';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { JwtDecode, UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();
  const signInMutation = useMutation(userService.signin);

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      setUserToken({ accessToken: res.toString(), refreshToken :"" });
      const decodetoken = jwtDecode<JwtDecode>(res as string);
      const user: UserInfo = {
        email: decodetoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        id: decodetoken.Id,
        avatar: "",
        username: data.username,
        role: decodetoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
      if (
        decodetoken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] === 'Administrator'
      ) {
        user.permissions = ADMIN_PERMISSION;
        setUserInfo(user);
        navigatge("/dashboard", { replace: true });
      } else if (
        decodetoken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] === 'Manager'
      ) {
        user.permissions = MANAGERS_PERMISSION;
        setUserInfo(user);
        navigatge("/manager/user", { replace: true });
      } else {
        user.permissions = STAFF_PERMISSION;
        setUserInfo(user);
        navigatge("/staff/order", { replace: true });
      }
      notification.success({
        message: 'Login sucessfully',
        description: `Welcome back: ${data.username}`,
        duration: 3,
      });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signIn, []);
};
export const useSignInGoogle = () => {
  const navigatge = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInGoogle = async (accessToken: string) => {
    try {
      setUserToken({ accessToken, refreshToken:'' });
      const decodetoken = jwtDecode<JwtDecode>(accessToken as string);
      const user: UserInfo = {
        email: decodetoken.email,
        id: '',
        avatar: decodetoken.picture,
        username: decodetoken.name,
        role: ''
      };
      user.permissions = ADMIN_PERMISSION;
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });
      notification.success({
        message: 'Login sucessfully',
        description: `Welcome back: ${decodetoken.name}`,
        duration: 3,
      });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signInGoogle, []);
};