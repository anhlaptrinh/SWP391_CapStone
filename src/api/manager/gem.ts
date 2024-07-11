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
    return useQuery(['listGems'], () =>
        apiClient.get({ url: '/gems?page=1&pageSize=100', params: { gemId: payload }}),
    );
};
export const useMonthlyProfit = (payload?: any) => {
    return useQuery(['monthlyProfit'], () =>
        apiClient.get({ url: '/invoices/monthlyProfit', params: { gemId: payload } }),
    );
};

export const useTransaction = (payload?: any) => {
    return useQuery(['transaction'], () =>
        apiClient.get({ url: '/invoices/transaction', params: { gemId: payload } }),
    );
};
export const useDailyProfit = (payload?: any) => {
    return useQuery(['dailyProfit'], () =>
        apiClient.get({ url: '/invoices/dailyProfit', params: { gemId: payload } }),
    );
};
export const useMonthlyProfitChange = (payload?: any) => {
    return useQuery(['monthlyProfitChange'], () =>
        apiClient.get({ url: '/invoices/monthlyProfitChange', params: { gemId: payload } }),
    );
};
export const useMonthlyRevenueOfYear = (payload?: any) => {
    return useQuery(['monthlyRevenueOfYear'], () =>
        apiClient.get({ url: '/invoices/MonthlyRevenueOfYear', params: { gemId: payload } }),
    );
};
export const useQuantityProductSaleInMonth = (payload?: any) => {
    return useQuery(['quantityProductSaleInMonth'], () =>
        apiClient.get({ url: '/invoices/QuantityProductSaleInMonth', params: { gemId: payload } }),
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
                queryClient.invalidateQueries(['listGems']);
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
                queryClient.invalidateQueries(['listGems']);
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
export const useListGemPrices = (payload?: any) => {
    return useQuery(['listGemPrices'], () =>
        apiClient.get({ url: '/gems/prices' }),
    );
};