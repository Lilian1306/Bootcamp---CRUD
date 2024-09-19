import { useEffect, useState } from "react";
import axios from "axios";


interface Variant {
    id: number;
    color: string;
    capacity: string;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    variants: Variant[];
  }

  export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5001/api/products');
          setProducts(response.data.products);
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);
  
    return { products, loading, error };
  };