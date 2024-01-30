"use client";
import React, { useState, createContext, useRef } from "react";

type AppContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AppContextProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    isAuth,
    setIsAuth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};
export default AppContextProvider;
