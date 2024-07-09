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
    price:    number;
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
export interface ProductGem {
    productId:     number;
    productName:   string;
    featuredImage: string;
    shape:         string;
    origin:        string;
    carat:         number;
    color:         string;
    clarity:       string;
    cut:           string;
    productPrice:  number;
    isActive:      boolean;
    quantity:      number;
    counter:       null | string;
    productType:   string;
    unit:          null | string;
}

export interface GoldProduct {
    productId:     number;
    productName:   string;
    quantity:      number;
    materialPrice: GoldPrice;
    counter:       string;
    isActive:      boolean;
    productType:   string;
    unit:          string;
}

export interface GoldPrice {
    buyPrice:  number;
    sellPrice: number;
    effDate:   Date;
}