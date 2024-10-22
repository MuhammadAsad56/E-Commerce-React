import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold mb-2">{order.username}</h2>
            <p className="text-gray-700">Email: {order.email}</p>
            <p className="text-gray-700">Phone: {order.number}</p>
            <p className="text-gray-700">Address: {order.address}</p>
            <h3 className="font-medium mt-4">Items:</h3>
            <ul className="list-disc list-inside ml-5">
                {order.items.map((item, index) => (
                    <li key={index} className="text-gray-600">{item}</li>
                ))}
            </ul>
            <p className="mt-2">
                Status: <strong className="text-blue-600">{order.status}</strong>
            </p>
            <p>Total Quantity: {order.totalQty}</p>
            <p>Total Price: <strong>${order.totalRs}</strong></p>
        </div>
    );
};

export default OrderCard;
