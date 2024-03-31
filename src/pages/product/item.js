import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React from 'react';

const item = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <div className="">Item here</div>
      <Footer />
    </div>
  );
}

export default item;
