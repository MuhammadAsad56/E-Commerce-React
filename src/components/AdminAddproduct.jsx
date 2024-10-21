// import React, { useContext, useRef, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { storage } from '../utils/firebase';

// const AdminAddproduct = () => {
//   const [productTitle, setProductTitle] = useState('');
//   const [brand, setBrand] = useState('');
//   const [description, setDescription] = useState('');
//   const [warrantyInformation, setWarrantyInformation] = useState('');
//   const [price, setPrice] = useState('');
//   const [category , setCategory] = useState('');
//   const [image, setImage] = useState('')
//   const {updatedProducts, setUpdatedProducts} = useContext(CartContext)
//   const imageRef = useRef(null)
  
//   let uploads = () => {
//     return new Promise((resolve,reject)=>{
//         let files = imageRef.current.files[0]
//         console.log("files>>", files);
        
//         const randoNum = Math.random().toString().slice(2)
//         const storageRef = ref(storage, `images/${randoNum}`);
//         const uploadTask = uploadBytesResumable(storageRef, files);
        
//         uploadTask.on('state_changed', 
//           (snapshot) => {
        
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//               case 'paused':
//                 console.log('Upload is paused');
//                 break;
//               case 'running':
//                 console.log('Upload is running');
//                 break;
//             }
//           }, 
//           (error) => {
//             reject(error.message)
//             // Handle unsuccessful uploads
//           }, 
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               console.log('File available at', downloadURL);
//               resolve(downloadURL)
//             });
//           }
//         );

//     })
// }

// const handleAddProduct = async () => {
//     try {
//       const imageUrl = await uploads(); // Wait for the image upload to complete
//       const response = await fetch('https://dummyjson.com/products/add',{
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: productTitle,
//           brand: brand,
//           category: category,
//           images: imageUrl,
//           description: description,
//           warrantyInformation: warrantyInformation,
//           price: price,
//         }),
//       });
      
//       const res = await response.json(); // Wait for the response
//       console.log(res);
//         setUpdatedProducts([...updatedProducts, res]);
//         console.log(updatedProducts);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };
  
// //   const handleAddProduct = () => {
// //     uploads().then(res => imageUrl = res)
// //     fetch('https://dummyjson.com/products/add', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           title: productTitle,
// //           brand: brand,
// //           category: category,
// //           image: imageUrl,
// //           description: description,
// //           warrantyInformation: warrantyInformation,
// //           price: price
// //         })
// //       })
// //       .then(res => res.json())      
// //       .then(res => {
// //         console.log(res);
// //         setUpdatedProducts([...updatedProducts, res,])
// //       } 
      
// //       );
// //     // Logic to add product
// //     console.log(`Product added:`);
// //     // setProductName('');
// //   };

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="text-xl font-semibold mb-2">Add Product</h2>
//       <input
//         type="text"
//         value={productTitle}
//         onChange={(e) => setProductTitle(e.target.value)}
//         placeholder="Title"
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         value={brand}
//         onChange={(e) => setBrand(e.target.value)}
//         placeholder="Brand"
//         className="border p-2 mb-2 w-full"
//       />
//     <select
//   value={category}
//   onChange={(e) => setCategory(e.target.value)}
//   className="border p-2 mb-2 w-full"
// >
//   <option value="" disabled>Select category</option>
//   <option value="fragrances">Fragrances</option>
//   <option value="beauty">Beauty</option>
//   <option value="furniture">Furniture</option>
//   <option value="groceries">Groceries</option>
// </select>

//       <input
//         type="file"
//         ref={imageRef}
//         placeholder="image"
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         value={warrantyInformation}
//         onChange={(e) => setWarrantyInformation(e.target.value)}
//         placeholder="Warranty"
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="Price"
//         className="border p-2 mb-2 w-full"
//       />
//       <button onClick={handleAddProduct} className="bg-green-500 text-white p-2 rounded">
//         Add Product
//       </button>
//     </div>
//   );
// };

// export default AdminAddproduct;


import React, { useContext, useRef, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import AdminProducts from './AdminProducts';

const AdminAddproduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [warrantyInformation, setWarrantyInformation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { updatedProducts, setUpdatedProducts } = useContext(CartContext);
  const imageRef = useRef(null);
  console.log("updatedProducts>>>", updatedProducts);
  const navigate = useNavigate()
  

  // Load products from local storage

  const uploads = () => {
    return new Promise((resolve, reject) => {
      let files = imageRef.current.files[0];
      const randoNum = Math.random().toString().slice(2);
      const storageRef = ref(storage, `images/${randoNum}`);
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleAddProduct = async () => {
        try {
          const imageUrl = await uploads(); // Wait for the image upload to complete
          const response = await fetch('https://dummyjson.com/products/add',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: productTitle,
              brand: brand,
              category: category,
              images: [imageUrl],
              description: description,
              warrantyInformation: warrantyInformation,
              price: price,
            }),
          });
          const res = await response.json();

      // Update context and local storage
      const updatedList = [...updatedProducts, res];
      setUpdatedProducts(updatedList);
      localStorage.setItem('products', JSON.stringify(updatedList)); // Save to local storage

      // Optionally reset form fields
      setProductTitle('');
      setBrand('');
      setDescription('');
      setWarrantyInformation('');
      setPrice('');
      setCategory('');
      imageRef.current.value = null; // Clear file input
      navigate(<AdminProducts/>)

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Add Product</h2>
      <input
        type="text"
        value={productTitle}
        onChange={(e) => setProductTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        className="border p-2 mb-2 w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="" disabled>Select category</option>
        <option value="fragrances">Fragrances</option>
        <option value="beauty">Beauty</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
      </select>
      <input
        type="file"
        ref={imageRef}
        placeholder="Image"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={warrantyInformation}
        onChange={(e) => setWarrantyInformation(e.target.value)}
        placeholder="Warranty"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleAddProduct} className="bg-green-500 text-white p-2 rounded">
        Add Product
      </button>
    </div>
  );
};

export default AdminAddproduct;

