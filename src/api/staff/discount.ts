import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { queryClient } from "@/http/tanstack/react-query";
import { message } from "antd";


export const useDiscount=(payload?:any)=>{
    return useQuery(['discount'], () =>
        apiClient.get({ url: `/customers?page=1&pageSize=100`,params:{customerId:payload}}),
    );
}

export const useCreateDiscount = () => {
    return useMutation(
        async (values: any) =>
            apiClient.post({
                url: `/customers`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Discount successfully');
                queryClient.refetchQueries(['discount']);
                close();
            },
            onError: () => message.error("Phone Number is exist")
        },
    );
};
export const useUpdateDiscount = () => {
    return useMutation(
        async (values: any) =>
            apiClient.put({
                url: `/customers`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update Discount successfully');
                queryClient.refetchQueries(['discount']);
                close();
            },
        },
    );
};

