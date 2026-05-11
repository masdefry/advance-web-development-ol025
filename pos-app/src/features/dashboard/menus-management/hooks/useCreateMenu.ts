import { useState } from 'react';
import { createMenuApi } from '../api/createMenuApi';

export default function useCreateMenu() {
  const [loading, setLoading] = useState(false);

  const execute = async (payload: any) => {
    try {
      setLoading(true);

      const res = await createMenuApi(payload);

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, 
    execute
  }
}
