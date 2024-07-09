import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";


export const useDiscount=(payload?:any)=>{
    return useQuery(['discount'], () =>
        apiClient.get({ url: `/customers?page=1&pageSize=100`,params:{customerId:payload}}),
    );
}