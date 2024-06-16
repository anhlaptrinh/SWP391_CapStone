export interface InvoicePagination {
    items:           Invoice[];
    currentPage:     number;
    pageSize:        number;
    totalRecords:    number;
    totalPages:      number;
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
}

export interface Invoice {
    invoiceId:    number;
    orderDate:    Date;
    status:       boolean;
    invoiceType:  boolean;
    customerName: string;
    userName:     string;
    warranty:     string;
    items:        Items[];
    total:        number;
}

export interface Items {
    productId:    number;
    productName:  string;
    productPrice: number;
}

