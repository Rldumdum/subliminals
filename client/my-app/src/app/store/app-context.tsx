"use client";
import React, { useState, createContext, useRef } from "react";

type AppContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  selected: number;
  setSelected: (selected: number) => void;
  data: any;
  setData: (data: any) => void;
};

export const AppContext = createContext<AppContextType>({
  isAuth: false,
  setIsAuth: () => {},
  selected: 0,
  setSelected: () => {},
  data: [],
  setData: () => {},
});

export const AppContextProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);

  const value = {
    isAuth,
    setIsAuth,
    selected,
    setSelected,
    data,
    setData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
