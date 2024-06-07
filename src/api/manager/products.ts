import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface ProductPayload {
    id: number;
    name: string;
    avatarUrl: string;
    category: string;
    gender: string;
    Product: string;
    gem: string;
}
export const useListProduct = (payload?: any) => {
    return useQuery(['listProduct'], () =>
        apiClient.get({ url: '/product', params: { ProductId: payload } }),
    );
};
export const useDetailProduct = (payload?: any) => {
    return useQuery(['detailProduct'], () =>
        apiClient.get({ url: '/product', params: { ProductId: payload } }),
    );
};
export const useCreateProduct = (payload?: any) => {
    return useMutation(
        async (values: ProductPayload) =>
            apiClient.post({
                url: `/product`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Product successfully');
                queryClient.invalidateQueries(['listProduct']);
            },
        },
    );
};
export const useUpdateProduct = (payload?: any) => {
    return useMutation(
        async (values: ProductPayload) =>
            apiClient.post({
                url: `/product`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update Product successfully');
                queryClient.invalidateQueries(['listProduct']);
            },
        },
    );
};
export const useDeleteProduct = () => {
    return useMutation(
        async (values: any) =>
            apiClient.delete({ url: '/product', params: { ProductId: values }, }),
        {
            onSuccess: () => {
                message.success('Delete Product successfully');
                queryClient.invalidateQueries(['listProduct']);
            },
        },
    );
};