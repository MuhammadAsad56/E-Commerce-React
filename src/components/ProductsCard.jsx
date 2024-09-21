import { Link } from 'react-router-dom'
// import { CardAdded } from '../context/AuthContext'
import { useContext } from 'react'
import { HeaderLinksContext } from '../context/AuthContext'

const ProductsCard = ({ data, onclick, isCartAdded , handleRemoveCart}) => {
  const { brand, category, description, images, id,title } = data
  // const {isCardAdded, setIsCardAdded}  = useContext(CardAdded)
  const { headerLinks, setHeaderLinks } = useContext(HeaderLinksContext)

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md hover:shadow-sky-400">
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
          <p className="mt-1">$16.00</p>
          </div>
          </Link>
          <button onClick={onclick} className='px-2 my-2 bg-sky-500 text-white'>{isCartAdded(data) ? `Added`: "Add to Cart"}</button>
          {headerLinks == "/cartitems" && (
            <button  onClick={handleRemoveCart} className='px-3 my-2 ml-3 bg-sky-500 text-white'>Remove from cart</button>
          )}
    </div>
    </>
  )
}

export default ProductsCard