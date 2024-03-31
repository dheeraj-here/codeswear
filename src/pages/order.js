import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Order = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [router.query]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Orders</h1>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase  dark:text-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-l-lg">Product name</th>
                    <th scope="col" className="px-6 py-3">Qty</th>
                    <th scope="col" className="px-6 py-3 rounded-r-lg">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white text-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">Apple MacBook Pro 17"</th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                  <tr className="bg-white text-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">Apple MacBook Pro 17"</th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                  <tr className="bg-white text-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">Apple MacBook Pro 17"</th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                </tbody>
                <tfoot className='my-20'>
                  <tr className="font-semibold text-gray-700">
                    <th scope="row" className="px-6 py-3 text-base">Total</th>
                    <td className="px-6 py-3">3</td>
                    <td className="px-6 py-3">21,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex my-5">
              <span className="title-font font-medium text-2xl text-gray-900">₹1497.00</span>
              <button className="">Button</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order;
