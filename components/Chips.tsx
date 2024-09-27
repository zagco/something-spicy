'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import LocationDrawer from './LocationDrawer'
import { db } from '../config/firebase'; // Import your Firebase config


interface Product {
  price: number;
  name: string;
  description: string;
  image: string;
  id: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [loading, setLoading] = useState(true); // State to show loading status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const collectionRef = collection(db, 'chips'); // Reference to the 'products' collection in Firestore
        const snapshot = await getDocs(collectionRef); // Fetch all documents in the 'products' collection
        const productList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Product[]; // Ensure the data is typed as Product[]
        
        setProducts(productList); // Update the products state with the fetched data
      } catch (error) {
        console.error("Error fetching products: ", error); // Log any errors that occur during fetching
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchProducts(); // Call the fetchProducts function to fetch data
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className='p-4'>

      

<h2 className='rakkas text-red-700 text-2xl lg:text-3xl mt-9'>R12 Each 2 For R20 Any Chips</h2>


    <div className='mt-9 flex overflow-x-scroll space-x-1 p-4 no-scrollbar'>
     {products.map((product) => ( 
       <div className="object-contain lg:w-[17rem]  min-h-[40px] 
           transition-transform duration-[450ms]
           mr-[8px] ml-3 shadow-md  cursor-pointer h-[435px] rounded-[8px] pt-4 p-5 min-w-[14rem]"
           
           key={product.id}>
         
         <img className="max-w-full aspect-[2/1] object-cover h-[13rem] rounded
" src={product.image} alt={product.name} /> 
         
       

       <div className="">
         <div> 
           <h2 className="raleway mt-4 text-lg font-extrabold break-words whitespace-normal overflow-auto h-[50px] no-scrollbar">{product.name}</h2>
           <p className="rakkas text-[#000000] text-2xl mb-[7px] break-words whitespace-nowrap overflow-hidden text-ellipsis
            ">R {product.price}</p>
           <p className="raleway text-gray-700 font-extrabold break-words whitespace-normal overflow-auto h-[50px] no-scrollbar">{product.description}</p>
           <LocationDrawer />
         </div>
         
       </div>
     </div>
     ))}
  
    </div>

  
    


    </div>
  );
};

export default ProductsList;
