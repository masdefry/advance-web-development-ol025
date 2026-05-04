import { axiosInstance } from '@/utils/axiosInstance';
import { LoginRequest } from '../types/login.type';
export async function loginApi(payload: LoginRequest) {
  const res = await axiosInstance.post('/auth/login', {
    email: payload.email,
    password: payload.password,
  });

  return res;
}
