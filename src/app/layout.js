"use client"
import React from 'react';
import { NavbarProvider } from '@/context/NavbarContext';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';


const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head className="">
      </head>
      <NavbarProvider>
          <body>{children}</body>
      </NavbarProvider>
    </html>
  );
}

export default Layout;

