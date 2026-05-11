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