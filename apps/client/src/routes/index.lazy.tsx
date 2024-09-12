import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useFetchProducts } from '../hooks/useFetchProducts'


export const Route = createLazyFileRoute('/')({
  component: Index,
})


function Index() {
  const { products, loading, error } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

 
  const filteredProduct = products
  .filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => 
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-2 text-gray-700 text-sm font-medium">
      <h3>Products</h3>

      <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-xl"
      />

       <div className="mb-4">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
          Sort by price:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="mt-1 p-2 border rounded-xl"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      
      <div className="grid grid-cols-3 gap-2">
      {filteredProduct.map((product) => (
         <div key={product.id} className="border p-4 rounded">
           <img src={product.image} alt={product.name} className="w-full h-30 object-cover mb-1" />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className=" text-sm text-black font-semibold">Price: ${product.price.toFixed(2)}</p>

            <ul className="list-disc pl-5">
              {product.variants.map(variant => (
                <>
                <li key={variant.id} className="text-gray-600">
                <h1>Color: {variant.color} </h1> 
                
                 
                </li>
                <li key={variant.id} className="text-gray-600">
                 Capacity: {variant.capacity}
                </li> 
                </>
               ))}
            </ul>
            
          <Link to={`/products/${product.id}`}>
          <button className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
             Add To Cart
          </button>
        </Link>
           </div>
         ))}
     </div>
     </div>
  )
}

export default Index;