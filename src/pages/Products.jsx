import { useContext, useEffect, useState, useCallback} from "react";
import ProductsCard from "../components/ProductsCard";
import Chip from "../components/Chip"
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { CartItems } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function Products() {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [chosenCategory, setChosenCategory] = useState("All")
  const {cartItems, setCartItems, handleAddCartItem, isCartAdded} = useContext(CartItems)

  const navigate = useNavigate()

  useEffect(() => {
    const url = chosenCategory == "All" ? 'https://dummyjson.com/products' : `https://dummyjson.com/products/category/${chosenCategory}`
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setProducts(res.products)
        setLoading(false)
      })
      .catch(res => setLoading(false))
  }, [chosenCategory])

  useEffect(() => {
   setLoading(true)
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(res => {
        setCategory(res)
        setLoading(false)
      })
      .catch((res) => setLoading(false))
  }, [])

  return (
    <>

      {loading ? (
        <Loading/>
      ) : (
        <>

          {/* {products Category section} */}
          <div className="flex bg-slate-50 border p-4 items-center flex-wrap justify-center ">
            <Chip isChosen={chosenCategory === "All"} onClick={() => setChosenCategory("All")} data={"All"} />
            {category.map((category, ind) => (
              <Chip
                onClick={() => setChosenCategory(category.slug)}
                isChosen={category.slug === chosenCategory}
                key={ind} data={category.name} />
            ))
            }
          </div>

          {/* {products Card section} */}
          <div className="flex flex-wrap my-10 px-3">
            {products
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((data, ind) => {
              return (
                <ProductsCard onclick={()=> handleAddCartItem(data)}
                isCartAdded={()=>isCartAdded(data)} key={ind} data={data} />
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

export default Products;