import axios from 'axios';
import { Product } from '../types/productTypes';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('http://localhost:5001/api/products');
  return response.data.products;
};