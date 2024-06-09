export interface Jwellery {
    productName:   string;
    priceRate:     number;
    productStatus: boolean;
    productImage:  string;
    id:            string;
}
export interface Pagination {
    items:           Product[];
    currentPage:     number;
    pageSize:        number;
    totalRecords:    number;
    totalPages:      number;
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
}

export interface Product {
    productId:        number;
    productName:      string;
    percentPriceRate: number;
    productionCost:   number;
    status:           boolean;
    featuredImage:    string;
    category:         string;
    productType:      string;
    gender:           string;
    colour:           string;
    gems:             Gem[];
    materials:        Material[];
}

export interface Gem {
    gemName:     string;
    origin:      string;
    caratWeight: number;
    colour:      string;
    clarity:     string;
    cut:         string;
}

export interface Material {
    materialName: string;
}