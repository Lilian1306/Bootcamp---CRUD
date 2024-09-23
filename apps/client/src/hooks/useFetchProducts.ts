import { useState, useEffect } from 'react';
import { Product } from '../types/productTypes';
import { fetchProducts } from '../api/productsApi';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return { products, loading, error };
};