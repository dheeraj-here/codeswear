// pages/_app.js
import React from 'react';
import { useState, useEffect, Router } from 'react';
import '../app/globals.css';
import { NavbarProvider } from '@/context/NavbarContext';
import Layout from '@/app/layout';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router';

// import { MyContextPro } from '@/app/helper/Context';

const MyApp = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
  },);


  return (
    <>
      <NavbarProvider>
        <LoadingBar
          color='#000000'
          progress={progress}
          waitingTime={500}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </NavbarProvider>
    </>
  );
}

export default MyApp;


