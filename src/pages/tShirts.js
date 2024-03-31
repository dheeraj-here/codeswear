import React, { useContext } from 'react';
import '../app/globals.css'
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Link from 'next/link';
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const tshirts = ({ products }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  // const data = useMyCont()
  // console.log(products);

  return (
    <>
      {/* <Navbar /> */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">

            {products.map((val, ind) => (
              <div key={ind} className="lg:w-1/4.5 flex-col justify-center md:w-1/2.5 p-3  shadow-lg m-3">
                <Link href={`/product/${val.slug}`}>
                  <img alt="ecommerce" props={ind} className="h-[28vh] sm:h-[36vh] block" src={`${val.img}`} />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{val.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{val.title}</h2>
                  <p className="mt-1">₹{val.price}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section >

    </>
  );
}

export async function getServerSideProps(context) {
  await connectDb();
  let products = await Product.find({ category: "Tshirt" });
  // console.log(products);
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  }
}

export default tshirts;
