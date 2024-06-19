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
    weight: number;
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
    gemId:       number;
    gemName:     string;
    featuredImage?:string;
    origin:      string;
    caratWeight: number;
    colour:      string;
    clarity:     string;
    cut:         string;
    gemPrice:    GemPrice;
}
export interface GemPrice {
    caratWeightPrice: number;
    colourPrice:      number;
    clarityPrice:     number;
    cutPrice:         number;
    total:            number;
}
export interface Material {
    materialId:    number;
    materialName:  string;
    materialPrice: MaterialPrice;
}
export interface MaterialPrice {
    buyPrice:  number;
    sellPrice: number;
}