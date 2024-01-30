"use client";
import { useContext, useEffect, useState } from "react";
import Forms from "../components/Forms";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie";
import { AppContext } from "../store/app-context";

const Authorization = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/api/account/verify", {
        method: "POST",
        headers: {
          authorization: `${Cookies.get("Authorization")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      if (data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        {!isAuth && <Forms setIsAuth={setIsAuth} />}
      </main>
    </>
  );
};

export default Authorization;
