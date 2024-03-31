"use client"
import React, { createContext, useContext } from 'react';

export const MyContext = createContext();
export const MyContextPro = ({children}) => {
    const username = "Dheeraj Bagwan"

  return (
    <div>
        <MyContext.Provider value={username}>
            {children}
        </MyContext.Provider>
    </div>
  );
}


export function useMyCont() {
  return useContext(MyContext)
}
