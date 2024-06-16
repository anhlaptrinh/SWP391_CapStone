import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface MaterialPayload {
    id: number;
    materialName: string;
    materialPrice: object;
}
export const useListMaterial = (payload?: any) => {
    return useQuery(['listMaterial'], () =>
        apiClient.get({ url: '/materials?page=1&pageSize=100', params: { MaterialId: payload } }),
    );
};
export const useDetailMaterial = (payload?: any) => {
    return useQuery(['detailMaterial'], () =>
        apiClient.get({ url: '/materials', params: { MaterialId: payload } }),
    );
};
export const useCreateMaterial = (payload?: any) => {
    return useMutation(
        async (values: MaterialPayload) =>
            apiClient.post({
                url: `/materials`,
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
                url: `/materials`,
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
            apiClient.delete({ url: '/materials', params: { MaterialId: values }, }),
        {
            onSuccess: () => {
                message.success('Delete Material successfully');
                queryClient.invalidateQueries(['listMaterial']);
            },
        },
    );
};