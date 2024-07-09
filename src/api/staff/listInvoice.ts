import { UseMutationResult, useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { message } from "antd";
import { queryClient } from "@/http/tanstack/react-query";

export type OrderPayload = {
    total:          number;
    perDiscount:    number;
    customerName:   string;
    phoneNumber:    string;
    userId:         number;
    invoiceDetails: number[];
  };
export const useListInvoice=(invoiceStatus: string,invoiceType:string, payload?: any)=>{
    return useQuery(['listInvoice',invoiceStatus ],()=>
        apiClient.get({url: '/invoices',params: {
          invoiceStatus,
          invoiceType,
          page: 1,
          pageSize: 100,
          invoiceId: payload
        }}) 
    )
}
export const useListPurchaseInvoice=(invoiceStatus: string,invoiceType:string, payload?: any)=>{
    return useQuery(['listPurchaseInvoice',invoiceStatus ],()=>
        apiClient.get({url: '/invoices',params: {
          invoiceStatus,
          invoiceType,
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

export const useCreateInvoice = (clearCart:()=>void) => {
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
                clearCart();
            },
        },
    );
};
export const useCreatePurchaseInvoice = (clearCart:()=>void) => {
    return useMutation(
        async (values: any) =>
            apiClient.post({
                url: `/invoices/CreatePurchaseInvoice`,
                data: values,
            }),
        {
            onSuccess: () => {
                message.success('Create Purchase Invoice successfully');
                queryClient.invalidateQueries(['listInvoice']);
                clearCart();
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

export const useChangeInvoice = () => {
  return useMutation(
      async (values: any) =>
          apiClient.put({ url: `/invoices/${values}/change` }),
      {
        onSuccess: (response) => {
            if (response.status === 204) {
                message.success('No Content, but Invoice updated successfully');
                queryClient.invalidateQueries(['listInvoice']); 
            } else if (response.status === 200) {
              message.success('Update Invoice successfully');
            }
            
          },
      },
  );
};