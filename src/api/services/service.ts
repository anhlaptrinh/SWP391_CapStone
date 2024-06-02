import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';

export const useListGoldPrice = () => {
    return useQuery(['listGoldPrice'], () =>
        apiClient.get({ url: 'https://codeuapi.vercel.app/api/tool/goldPrice' }),
    );
};
