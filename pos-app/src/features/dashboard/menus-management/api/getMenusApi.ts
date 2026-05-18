import { axiosInstance } from "@/utils/axiosInstance";

export async function getMenusApi(){
    const res = await axiosInstance.get('/products');
    
    return {
        products: res?.data?.data?.products, 
        meta: res?.data?.data?.meta
    }
}