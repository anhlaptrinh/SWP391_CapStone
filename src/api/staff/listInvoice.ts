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
export const useListInvoice=(invoiceStatus: string, payload?: any)=>{
    return useQuery(['listInvoice',invoiceStatus ],()=>
        apiClient.get({url: '/invoices',params: {
          invoiceStatus,
          page: 1,
          pageSize: 100,
          invoiceId: payload
        }}) 
    )
}
// export const useListProcessingInvoice=(payload?:any)=>{
//   return useQuery(['listInvoice', ],()=>
//       apiClient.get({url: '/invoices?invoiceStatus=Processing&page=1&pageSize=100', params: {invoiceId:payload}}) 
//   )
// }
// export const useListDeliveredInvoice=(payload?:any)=>{
//   return useQuery(['listInvoice', ],()=>
//       apiClient.get({url: '/invoices?invoiceStatus=Delivered&page=1&pageSize=100', params: {invoiceId:payload}}) 
//   )
// }



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
                url: `/invoices`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Invoice successfully');
                queryClient.invalidateQueries(['listInvoice']);
            },
        },
    );
};

export const useCancelInvoice = () => {
  return useMutation(
      async (values: any) =>
          apiClient.delete({ url: `/invoices/${values}` }),
      {
          onSuccess: () => {
              queryClient.fetchQuery(['listInvoice'])
              message.success('Cancel Invoice successfully');
              queryClient.invalidateQueries(['listInvoice']);
          },
      },
  );
};

export const useChangeInvoice = (invoiceStatus:any) => {
  return useMutation(
      async (values: any) =>
          apiClient.put({ url: `/invoices/${values}/change` }),
      {
          onSuccess: () => {
              queryClient.fetchQuery(['listInvoice',{invoiceStatus}])
              message.success('Update Invoice successfully');
              queryClient.invalidateQueries(['listProduct']);
          },
      },
  );
};