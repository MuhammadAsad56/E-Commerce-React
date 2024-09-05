// import React from 'react'
// import { useEffect, useState} from 'react'

// const UseEffect = () => {
//     const [products, setProducts] = useState([])
//     const [searchValue, setSearchValue] = useState("")

//    const searched = products.filter((data) => data.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
   

//     useEffect(()=>{
//         getProducts()
//     },[])

//     const getProducts = () => {
//         fetch("https://fakestoreapi.com/products")
//           .then((res) => res.json())
//           .then((res) => {
//             setProducts(res);
//           });
//       };

//   return (
//     <>
//         <input style={{border: "1px solid gray"}} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
//     {
//         searched.map((data, ind)=>{
//             return(
//                 <>
//                <h1 style={{backgroundColor: "black", color:"white"}} key={ind} ><span>{ind+1}{")"}</span>  {data.title}</h1>
//                 </>
//             )
//         })
//     }
//    </>
//   )
// }

// export default UseEffect

