import { useState } from 'react';
import { getCategoriesApi } from '../api/getCategoriesApi';
export default function useGetCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const execute = async () => {
    try {
      setLoading(true);

      const res = await getCategoriesApi();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    execute,
  };
}
