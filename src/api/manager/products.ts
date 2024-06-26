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
        apiClient.get({ url: '/products/jewelries?page=1&pageSize=100', params: { ProductId: payload } }),
    );
};
export const useListCategory = () => {
    return useQuery(['listCategory'], () =>
        apiClient.get({ url: '/categories'}),
    );
};
export const useDetailProduct = (payload?: any) => {
    return useQuery(['detailProduct'], () =>
        apiClient.get({ url: '/products', params: { ProductId: payload } }),
    );
};
export const useCreateProduct = () => {
    return useMutation(
        async (values: any) =>
            apiClient.post({
                url: `/products`,
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
export const useUpdateProduct = () => {
    return useMutation(
        async (values: any) =>
            apiClient.put({
                url: `/products`,
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
            apiClient.delete({ url: `/products/${values}` }),
        {
            onSuccess: () => {
                message.success('Delete Product successfully');
                queryClient.invalidateQueries(['listProduct']);
            },
        },
    );
};
export const useListColour = () => {
    return useQuery(['listColour'], () =>
        apiClient.get({ url: '/colours'}),
    );
};
export const useListGender = () => {
    return useQuery(['listGender'], () =>
        apiClient.get({ url: '/genders'}),
    );
};
export const useListProducttype = () => {
    return useQuery(['listProducttype'], () =>
        apiClient.get({ url: '/producttypes' }),
    );
};
