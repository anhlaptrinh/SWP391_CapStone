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
    invoiceId:         number;
    orderDate:         string;
    invoiceType:       string;
    invoiceStatus:     string;
    total:             number;
    perDiscount:       number;
    totalWithDiscount: number;
    customerName:      string;
    userName:          string;
    warranty:          string;
    items:             Items[];
}

export interface Items {
    productId:    number;
    productName:  string;
    productPrice: number;
}

