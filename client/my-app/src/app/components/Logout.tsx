"use client"
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { AppContext } from "../store/app-context";
import axios from "axios";

const Logout = () => {
  const {isAuth, setIsAuth, setData} = useContext(AppContext);
  const LogoutHandler = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/api/account/signOut", {
      headers: {
        authorization: `${Cookies.get("Authorization")}`,
      },
    });
    const data = res.data
    if (!data.success) {
      throw new Error("Failed to fetch data");
    }
    if (data.success) {
      Cookies.remove("Authorization");
      setIsAuth(false);
      setData([])
    }
  };
  return (
    <form onSubmit={(e) =>LogoutHandler(e)}>
      <button
        type="submit"
        className=" py-2 px-8 "
      >
        Log Out
      </button>
    </form>
  );
};

export default Logout;
