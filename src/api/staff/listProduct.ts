import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

export const useListProduct = () => {
    return useQuery(['listProduct'], () =>
        apiClient.get({ url: '/products?page=1&pageSize=5'}),
    );
};