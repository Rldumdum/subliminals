"use client";
import { useContext, useEffect, useState } from "react";
import Forms from "../components/Forms";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie";
import { AppContext } from "../store/app-context";
import axios from "axios";

const Authorization = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post("/api/account/verify", {
        headers: {
          authorization: `${Cookies.get("Authorization")}`,
        },
      });
      const data = res.data
      if (!data.success) {
        throw new Error("Failed to fetch data");
      }
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
