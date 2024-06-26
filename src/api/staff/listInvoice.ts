import { UseMutationResult, useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { message } from "antd";
import { queryClient } from "@/http/tanstack/react-query";

export type OrderPayload = {
    customerName?: string;
    userName?: string;
    warranty?: string;
    orderDetails: [{
      productName: string;
      total: number;
      perDiscount?: number;
    }];
  };
export const useListInvoice=(payload?:any)=>{
    return useQuery(['listInvoice', ],()=>
        apiClient.get({url: '/invoices?page=1&pageSize=100', params: {invoiceId:payload}}) 
    )
}



  export const useUpdateInvoice=()=>{
    return useMutation(
        async (values: any) =>
            apiClient.put({
                url: `/invoices`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Update Invoice successfully');
                queryClient.invalidateQueries(['listInvoice']);
            },
        },
    )
}

export const useCreateInvoice = () => {
    return useMutation(
        async (values: any) =>
            apiClient.post({
                url: `/products`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Product successfully');
                queryClient.invalidateQueries(['listProduct']);
            },
        },
    );
};