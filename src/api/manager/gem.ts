import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';
import apiClient from '../apiClient';

export interface GemPayload {
    gemId: string;
    gemName: string;
    featuredImage: string;
    origin: string;
    caratWeight: string;
    colour: string;
    clarity: string;
    cut: string;
    // gemPrice: object;
}
export const useListGem = (payload?: any) => {
    return useQuery(['listGem'], () =>
        apiClient.get({ url: '/gems?page=1&pageSize=100', params: { gemId: payload }}),
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
            apiClient.put({
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
export const useListShape = (payload?: any) => {
    return useQuery(['listShapes'], () =>
        apiClient.get({ url: '/shapes'}),
    );
};
export const useListOrigin = (payload?: any) => {
    return useQuery(['listOrigins'], () =>
        apiClient.get({ url: '/origins'}),
    );
};
export const useListClarity = (payload?: any) => {
    return useQuery(['listClarities'], () =>
        apiClient.get({ url: '/clarities'}),
    );
};
export const useListCarat = (payload?: any) => {
    return useQuery(['listCaratweights'], () =>
        apiClient.get({ url: '/caratweights'}),
    );
};
export const useListCut = (payload?: any) => {
    return useQuery(['listCuts'], () =>
        apiClient.get({ url: '/cuts'}),
    );
};
export const useListColor = (payload?: any) => {
    return useQuery(['listColors'], () =>
        apiClient.get({ url: '/colors'}),
    );
};