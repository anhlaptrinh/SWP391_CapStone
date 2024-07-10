import { message as Message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getItem, removeItem } from '@/utils/storage';

import { Result } from '#/api';
import { UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<any>) => {
        if (!res.data) throw new Error('The interface request failed, please try again later!');
        const { message } = res.data;
        const hasSuccess = res.data && Reflect.has(res, 'status');

        if (hasSuccess) {
            return res.data;
        }
        throw new Error(message || 'The interface request failed, please try again later!');
    },
    async (error: AxiosError<Result>) => {
        let errMsg = '';
        const { response, message } = error || {};
        if (error.response?.status === 401) {
            Message.error('Token Expire! Redirect to Login Page');
            setTimeout(() => {
                removeItem(StorageEnum.Token);
                window.location.hash = '#/login';
                window.location.reload();
            }, 1000);
            return Promise.reject(error);
        }
        try {
            errMsg = response?.data?.message || message;
            Message.error(errMsg);
        } catch (error) {
            throw new Error(error as unknown as string);
        }
        return Promise.reject(error);
    },
);
class APIClient {
    download(config: AxiosRequestConfig): Promise<AxiosResponse<Blob>> {
        return axiosInstance.request<Blob>({
            ...config,
            responseType: 'blob',
        });
    }
    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'GET' });
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'POST' });
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PUT' });
    }

    patch<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PATCH' });
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'DELETE' });
    }

    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            axiosInstance
                .request<any, AxiosResponse<Result>>(config)
                .then((res: AxiosResponse<Result>) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                });
        });
    }
}
export default new APIClient();
