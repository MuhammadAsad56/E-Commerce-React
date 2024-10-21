import React from 'react';

const AdminCartPanel = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', quantity: 2 },
    { id: 2, name: 'Product 2', quantity: 1 },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCartPanel;