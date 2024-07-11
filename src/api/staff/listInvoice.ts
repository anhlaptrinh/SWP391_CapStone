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
        onSuccess: () => {
              message.success('Update Invoice successfully');
              queryClient.invalidateQueries(['listInvoice']); 
            
          },
      },
  );
};
// print invoice 



export const usePrintWarranty = () => {
    return useMutation(
        async  (invoiceId:number) => {
            const response = await apiClient.download({
                url: `/pdf?invoiceId=${invoiceId}&warrantyId=1`,
                method: 'POST',
                responseType: 'blob', // Đảm bảo rằng phản hồi là một blob
            });

            // Lấy tên file từ header nếu có
            const contentDisposition = response.headers?.['content-disposition'];
            let fileName = 'invoice.pdf';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch && fileNameMatch.length === 2) {
                    fileName = decodeURIComponent(fileNameMatch[1]);
                }
            }

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        },
        {
            onSuccess: () => {
                message.success('Download successfully');
                queryClient.invalidateQueries(['listInvoice']);
            },
            onError: (error: any) => {
                message.error(`Failed to download PDF: ${error.message}`);
            },
        },
    );
};

export const usePaymentVNPAY = () => {
    return useMutation(
        async (invoiceId:number) => {
            const response = await apiClient.post({
                url: `/invoices/${invoiceId}/payment`,
                
            });
            return response.data.paymentUrl; // URL từ API trả về
        },
        {
            onSuccess: (paymentUrl) => {
                // Chuyển hướng người dùng đến URL thanh toán VNPAY
                window.location.href = paymentUrl;
            },
            onError: (error: any) => {
                message.error(`Failed to initiate payment: ${error.message}`);
            },
        },
    );
};