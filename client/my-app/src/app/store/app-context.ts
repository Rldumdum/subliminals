"use client";
import React, { useState, createContext, useRef } from "react";

type AppContextType= {
  mute: boolean,
  setMute: (mute: boolean) => void,
  handleToggleMute: () => void,
  // audioRef: React.RefObject<HTMLAudioElement | null> | null,
}

export const AppContext = createContext<AppContextType>({
  mute: true,
  setMute: () => {},
  handleToggleMute: () => {},
  // audioRef: null,
});

export const AppContextProvider = ({ children }: any) => {
  const [mute, setMute] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleMute = () => {
    setMute((prevState: boolean) => !prevState);
  };

  const value = {
    mute,
    setMute,
    handleToggleMute,
    // audioRef,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );

export default AppContextProvider;
