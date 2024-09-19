
import { fetchProducts } from '../api/productsApi';

jest.mock('../api/productsApi');
const mockedFetchProducts = fetchProducts as jest.Mock;

describe('useFetchProducts', () => {
  it('shows loading message initially', () => {
    mockedFetchProducts.mockResolvedValue([]); 
  });
});