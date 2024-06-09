import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface GemPayload {
    id: number;
    name: string;
    origin: string;
    caraWeight: string;
    color: string;
    clarity: string;
    cut: string;
    gemPrice: object;
}
export const useListGem = () => {
    return useQuery(['listGem'], () =>
        apiClient.get({ url: '/gems?page=1&pageSize=100'}),
    );
};
export const useDetailGem = (payload?: any) => {
    return useQuery(['detailGem'], () =>
        apiClient.get({ url: '/gems', params: { gemId: payload }}),
    );
};
export const useCreateGem = (payload?: any) => {
    return useMutation(
        async (values: GemPayload) =>
            apiClient.post({
                url: `/gems`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create gem successfully');
                queryClient.invalidateQueries(['listGem']);
            },
        },
    );
};
export const useUpdateGem = (payload?: any) => {
    return useMutation(
        async (values: GemPayload) =>
            apiClient.post({
                url: `/gems`,
                params: payload,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update gem successfully');
                queryClient.invalidateQueries(['listGem']);
            },
        },
    );
};
export const useDeleteGem = () => {
    return useMutation(
        async (values: any) =>
            apiClient.delete({ url: '/gems', params: { gemId: values }, }),
        {
            onSuccess: () => {
                message.success('Delete gem successfully');
                queryClient.invalidateQueries(['listGem']);
            },
        },
    );
};