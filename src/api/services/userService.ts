import apiClient from '../apiClient';

import { UserToken } from '#/entity';

export interface SignInReq {
    username: string;
    password: string;
}

export interface SignUpReq extends SignInReq {
    email: string;
}
export type SignInRes = UserToken;

export enum UserApi {
    SignIn = '/auth/sigin',
    SignUp = '/auth/signup',
    Logout = '/auth/logout',
    Refresh = '/auth/refresh',
}

const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.get({ url: UserApi.Logout });

export default {
    signin,
    signup,
    logout,
};
