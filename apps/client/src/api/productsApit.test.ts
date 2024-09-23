import axios from 'axios';
import { fetchProducts } from './productsApi';
import { Product } from '../types/productTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchProducts', () => {
  it('should fetch and return products', async () => {
   
    const mockData: Product[] = [
      { id: 1, name: 'Product 1', price: 100, image: 'image1.png', variants: [] },
    ];

    mockedAxios.get.mockResolvedValue({ data: { products: mockData } });

    const products = await fetchProducts();

    expect(products).toEqual(mockData);
  })
})