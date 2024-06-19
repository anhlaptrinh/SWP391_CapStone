import { UseMutationResult, useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { InvoicePagination } from "#/invoice"
import { PAGE_SIZE } from "@/constants/page"
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
export const useListInvoice=(currentPage:number)=>{
    return useQuery(['listInvoice', {currentPage}],()=>
        apiClient.get<InvoicePagination>({url: `/invoices?page=${currentPage}&pageSize=${PAGE_SIZE}`}) 
    )
}

export const useListOrder=()=>{
    return useQuery(['listOrder'],()=>
        apiClient.get({url: `/orders`})
    )
}

export const useCreateOrder = (): UseMutationResult<void, Error, OrderPayload[]> => {
    return useMutation<void, Error, OrderPayload[]>({
      mutationFn: async (payload: OrderPayload[]) => {
        // Sử dụng Promise.all để gửi từng đơn hàng trong payload
        await Promise.all(
          payload.map(async (order) => {
            try {
              await apiClient.post({ url: '/orders', data: order });
            } catch (error) {
              throw new Error(`Failed to create order: ${error.message}`);
            }
          })
        );
      },
      onSuccess: () => {
        // Xử lý khi thành công
        message.success('Order(s) successfully created.');
        queryClient.fetchQuery(["listOrder"]);
        
        // Ví dụ: Clear cartItems sau khi đơn hàng được gửi thành công
         // Đặt hàm setCartItems ở đây nếu setCartItems là state của Jwelery component
      },
      onError: (error: Error) => {
        // Xử lý khi có lỗi
        message.error(`Failed to create order(s): ${error.message}`);
      },
    });
  };