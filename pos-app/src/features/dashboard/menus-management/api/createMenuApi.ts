import { axiosInstance } from "@/utils/axiosInstance";

export async function createMenuApi(payload: any){
    const res = await axiosInstance.post('/products', payload);

    console.log(res);
}