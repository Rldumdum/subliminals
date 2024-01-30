import { useState } from "react";
import Cookies from "js-cookie";

const Logout = ({setIsAuth}: any) => {
  const LogoutHandler = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/account/signOut", {
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
      Cookies.remove("Authorization");
      setIsAuth(false);
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
