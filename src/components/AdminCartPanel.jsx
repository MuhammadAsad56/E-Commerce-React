import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDoc, getDocs, or } from 'firebase/firestore';
import OrderCard from './OrderCard';
import Loading from './Loading';

const AdminCartPanel = () => {
  const [orders, setOrders] = useState([])
  const [ loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
        const reference = collection(db, "orders");
        const res = await getDocs(reference);
        const items = res.docs.map(doc => ({ ...doc.data(), dbId: doc.id }));
        setOrders(items);
        setLoading(false)
    }
    fetchData();
}, []);


     return (
      // <h1>hi</h1>
      <>
      {loading ? <Loading/> :
      <>
       <div className="flex flex-wrap justify-center">
            {orders.map(order => (
              <OrderCard key={order.dbId} order={order} />
            ))}
        </div>
      </>
}
</>
  );
};

export default AdminCartPanel;