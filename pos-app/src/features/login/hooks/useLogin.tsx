import { useState } from 'react';
import { loginApi } from '@/features/login/api/loginApi';
import { LoginRequest } from '../types/login.type';
import { AxiosError } from 'axios';

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const execute = async (payload: LoginRequest) => {
    try {
      setLoading(true);

      const res = await loginApi({
        email: payload.email,
        password: payload.password,
      });

      alert(res?.data?.message);

      return;
    } catch (error) {
      const err = error as AxiosError<any>;
      alert(err?.response?.data?.message);

      return;
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    loading,
    execute,
  };
}
