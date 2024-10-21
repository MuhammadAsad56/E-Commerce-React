import { Image } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {updatedProducts, setUpdatedProducts} = useContext(CartContext)

    // useEffect(() => {
    //     setLoading(true)
    //     setProducts(updatedProducts)
    //     console.log(updatedProducts);
    //     setLoading(false)
    // }, [])

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products'));
        setProducts(savedProducts);
        setLoading(false)
      }, [updatedProducts]);
    // useEffect(() => {
    //     const savedProducts = JSON.parse(localStorage.getItem('products'));
    //     setUpdatedProducts(savedProducts);
    //   }, []);

    return (
        <>
            {loading ? (
                <div className="w-full flex items-center justify-center">
                    <h1 className="inline-block text-center text-md font-semibold my-10 px-3 py-1 bg-amber-500 text-white">Loading...</h1>
                </div>
            ) :
                (
                    <>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">All Products</h2>
                            {
                                products.map((data, ind) => {
                                    const { description, images, title, price } = data
                                    return (
                                        <div key={ind} className="flex flex-col sm:flex-row items-center lg:w-3/5 border-b p-5 mx-auto mb-10 border-gray-300 shadow-md gap-4 sm:justify-between">
                                            <Image src={images[0]} width={150} height={100} className="mx-auto sm:mx-0" />
                                            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                                                    {title}
                                                </h2>
                                                <p className="leading-relaxed text-base mb-2">
                                                    {description}
                                                </p>
                                                <p className='title-font text-lg font-medium'>Price: ${price}/-</p>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default AdminProducts;
