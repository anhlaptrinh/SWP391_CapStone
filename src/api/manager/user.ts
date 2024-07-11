import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface UserPayload {
    userId: number;
    userName: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    roleId: string;
}
export const useListUser = () => {
    return useQuery(['listUser'], () =>
        apiClient.get({ url: '/users?page=1&pageSize=100'}),
    );
};
export const useEmployeeRevenue = () => {
    return useQuery(['employeeRevenue'], () =>
        apiClient.get({ url: '/users/employee-revenue' }),
    );
};
export const useListCounters = () => {
    return useQuery(['listCounters'], () =>
        apiClient.get({ url: '/counters' }),
    );
};
export const useDetailUser = (payload?: any) => {
    return useQuery(['detailUser'], () =>
        apiClient.get({ url: '/users', params: { UserId: payload } }),
    );
};
export const useCreateUser = () => {
    return useMutation(
        async (values: UserPayload) =>
            apiClient.post({
                url: `/users`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create User successfully');
                queryClient.invalidateQueries(['listUser']);
            },
        },
    );
};
export const useUpdateUser = (payload?: any) => {
    return useMutation(
        async (values: UserPayload) =>
            apiClient.post({
                url: `/users`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update User successfully');
                queryClient.invalidateQueries(['listUser']);
            },
        },
    );
};
export const useUpdateCounters = () => {
    return useMutation(
        async (values: any) =>
            apiClient.put({
                url: `/users/${values.userId}/assign-to-counter?counterId=${values.counterId}`,
            }),
        {
            onSuccess: () => {
                message.success('Update User successfully');
                queryClient.invalidateQueries(['listUser']);
            },
        },
    );
};
export const useDeleteUser = () => {
    return useMutation(
        async (values: any) =>
            apiClient.delete({ url: '/users', params: { UserId: values }, }),
        {
            onSuccess: () => {
                message.success('Delete User successfully');
                queryClient.invalidateQueries(['listUser']);
            },
        },
    );
};