import React from 'react'
import { Link } from 'react-router-dom'

const ProductsCard = ({ data }) => {
  const { brand, category, description, images, id,title } = data
  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md">
        <Link to={`/products/${id}`}>
          <a className="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={images[0]}
            />
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {category}
            </h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {title}
            </h2>
            {/* <h2 className="text-gray-900 title-font text-lg font-medium">
              {brand}
            </h2> */}
            <p className="mt-1">$16.00</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductsCard