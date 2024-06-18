import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PAGE_SIZE } from "@/constants/page";

export const useListProduct = (currentPage:number) => {
    return useQuery(['listProduct'], () =>
        apiClient.get({ url: `/products?page=${currentPage}&pageSize=${PAGE_SIZE}`}),
    );
};

export const useListGemProduct=(currentPage:number)=>{
    return useQuery(['gem-product'], () =>
        apiClient.get({ url: `/gems?page=${currentPage}&pageSize=${PAGE_SIZE}`}),
    );
}