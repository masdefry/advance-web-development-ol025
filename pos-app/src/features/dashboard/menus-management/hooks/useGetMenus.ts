import { useEffect, useState } from 'react';
import { getMenusApi } from '../api/getMenusApi';

export default function useGetMenus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});

  const execute = async () => {
    try {
      setLoading(true);

      const { products, meta } = await getMenusApi();
     
      setProducts(products);
      setMeta(meta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return {
    loading,
    products,
    meta,
  };
}
