import { useContext, useEffect, useState, useCallback} from "react";
import ProductsCard from "../components/ProductsCard";
import Chip from "../components/Chip"
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { CartItems , CardAdded} from "../context/AuthContext";
import { auth, db } from "../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function Products() {
  
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [chosenCategory, setChosenCategory] = useState("All")
  const {cartItems, setCartItems} = useContext(CartItems)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()
  
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
        if(user){
          setAuthenticated(true)
        }else{
          setAuthenticated(false)
        }
      })
    },[])

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

  useEffect(() => {
    async function fetchData(){
      const reference = collection(db, "cartitems")
      const res = await getDocs(reference)
      let items = [];
        res.forEach((doc) => {
          let obj = {
            id: doc.id,
            ...doc.data()
          }  
          items.push(obj)
        })
        setCartItems(items)
    }
      fetchData()
   } ,[cartItems, db])

   const handleAddCartItem = useCallback(
    async (item) => {
      if (authenticated) {
        const cartItemsArr = [...cartItems];
        const isAdded = cartItemsArr.findIndex((data) => data.id === item.id);
        if (isAdded == -1) { 
          cartItemsArr.push(item)
          setCartItems([...cartItemsArr])
          const ref = await addDoc(collection(db, "cartitems"), item);
        }
      } else {
        alert("Please sign up your account");
        navigate("/signup");
      }
    },
    [authenticated, cartItems, setCartItems, navigate, db]
  )
  
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
              const isCartAdded = cartItems.findIndex(item => item.id == data.id) == -1
              return (
                <ProductsCard isCartAdded={isCartAdded} onclick={()=> handleAddCartItem(data)} key={ind} data={data} />
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