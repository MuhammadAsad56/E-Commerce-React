import { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import Chip from "../components/Chip"
import { Link } from "react-router-dom";

function Products() {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [chosenCategory, setChosenCategory] = useState("All")

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
        <div className="w-full">
          <h1 className="text-center text-3xl my-10">Loading...</h1>
        </div>
      ) : (
        <>
          {/* {products Category section} */}
          <div className="flex flex-wrap ml-5">
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
            .map((data, ind) => (
              <ProductsCard key={ind} data={data} />
            ))
            }
          </div>
        </>
      )
      }

    </>
  )
}

export default Products;