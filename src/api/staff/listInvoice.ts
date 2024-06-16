import { useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { InvoicePagination } from "#/invoice"
import { PAGE_SIZE } from "@/constants/page"


export const useListInvoice=(currentPage:number)=>{
    return useQuery(['listInvoice', {currentPage}],()=>
        apiClient.get<InvoicePagination>({url: `/invoices?page=${currentPage}&pageSize=${PAGE_SIZE}`}) 
    )
}