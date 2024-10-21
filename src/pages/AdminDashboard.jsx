import React, { useState } from 'react';
import AdminCartPanel from '../components/AdminCartPanel';
import AdminProducts from '../components/AdminProducts';
import AdminAddproduct from '../components/AdminAddproduct';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActiveTab('products')} className="bg-blue-500 text-white p-2 rounded">
          Products
        </button>
        <button onClick={() => setActiveTab('cart')} className="bg-blue-500 text-white p-2 rounded">
          Cart
        </button>
        <button onClick={() => setActiveTab('addProduct')} className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </div>

      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'cart' && <AdminCartPanel />}
      {activeTab === 'addProduct' && <AdminAddproduct />}
    </div>
  );
}

export default AdminDashboard;