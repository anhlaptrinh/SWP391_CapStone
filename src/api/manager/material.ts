import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface MaterialPayload {
    id: number;
    name: string;
    weight: string;
    buyPrice: string;
    sellPrice: string;
}
export const useListMaterial = (payload?: any) => {
    return useQuery(['listMaterial'], () =>
        apiClient.get({ url: '/material', params: { MaterialId: payload } }),
    );
};
export const useDetailMaterial = (payload?: any) => {
    return useQuery(['detailMaterial'], () =>
        apiClient.get({ url: '/material', params: { MaterialId: payload } }),
    );
};
export const useCreateMaterial = (payload?: any) => {
    return useMutation(
        async (values: MaterialPayload) =>
            apiClient.post({
                url: `/material`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Material successfully');
                queryClient.invalidateQueries(['listMaterial']);
            },
        },
    );
};
export const useUpdateMaterial = (payload?: any) => {
    return useMutation(
        async (values: MaterialPayload) =>
            apiClient.post({
                url: `/material`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update Material successfully');
                queryClient.invalidateQueries(['listMaterial']);
            },
        },
    );
};
export const useDeleteMaterial = () => {
    return useMutation(
        async (values: any) =>
            apiClient.delete({ url: '/material', params: { MaterialId: values }, }),
        {
            onSuccess: () => {
                message.success('Delete Material successfully');
                queryClient.invalidateQueries(['listMaterial']);
            },
        },
    );
};