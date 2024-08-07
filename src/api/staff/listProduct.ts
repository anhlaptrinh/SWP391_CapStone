import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

export const useListJwelery = (payload?:any) => {
    return useQuery(['listProducts'], () =>
        apiClient.get({ url: `/products/jewelries?isActive=true&page=1&pageSize=100`,params:{productId:payload}}),
    );
};

export const useListGems=(payload?:any)=>{
    return useQuery(['listGems'], () =>
        apiClient.get({ url: `/products/gems?isActive=true&page=1&pageSize=100`,params:{gemId:payload}}),
    );
}
export const useListGemsById=(payload?:any)=>{
    return useQuery(['listGemsById'], () =>
        apiClient.get({ url: `/gems/${payload}`}),
);
}

export const uselistGold=(payload?:any) => {
    return useQuery(['list-gold'], () =>
        apiClient.get({ url: `/products/materials?isActive=true&page=1&pageSize=100`,params:{materialId:payload}}),
    );
}
export const useGetProductById=(payload?:any)=>{
    return useQuery(['get-product-by-id'], () =>
        apiClient.get({ url: `/products/${payload}`}),)
}




