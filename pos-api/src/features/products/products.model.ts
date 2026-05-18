export type ProductsCreateRequest = {
    name: string; 
    price: string; 
    categoryId: string; 
    isAvailable: boolean;
}

export type ProductsListQuery = {
    page: number; 
    limit: number; 
    search?: string; 
    categoryId?: string;
}

export type CacheProducts = {
  products: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};