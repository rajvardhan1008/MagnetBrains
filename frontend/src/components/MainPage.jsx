import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router';

function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state;
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({
    consumer: [],
    industrial: [],
    components: [],
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/product/getall');
        setAllProducts(data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    })();
  }, []);

  useEffect(() => {
    const searchLower = search.toLowerCase();

    const filtered = {
      consumer: [],
      industrial: [],
      components: [],
    };

    allProducts.forEach((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchLower);

      if (nameMatch) {
        if (product.category === 'Consumer') filtered.consumer.push(product);
        if (product.category === 'Industrial') filtered.industrial.push(product);
        if (product.category === 'Components') filtered.components.push(product);
      }
    });

    setFilteredProducts(filtered);
  }, [search, allProducts]);

  const handleBuyNow = async (productId) => {

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/v1/order/create', {
        productId,
        customerId: userId,
      });

      console.log("response", res);

      alert('Order placed successfully!');

      const approvalUrl = res.data.approvalUrl;

      if(approvalUrl){
        window.location.href = approvalUrl;
      }
      
    } catch (err) {
      console.error('Order failed:', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Catalog</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {['consumer', 'industrial', 'components'].map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category} Products</h2>
          {filteredProducts[category].length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts[category].map((product) => (
                <div
                  key={product._id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="mt-2 text-green-700 font-semibold">${product.price}</p>
                  <button
                    onClick={() => handleBuyNow(product._id)}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MainPage;