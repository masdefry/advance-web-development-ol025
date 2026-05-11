import { axiosInstance } from "@/utils/axiosInstance";

export async function getCategoriesApi(){
    const res = await axiosInstance.get('/categories');

    return res.data;
}