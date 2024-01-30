"use client";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import Cookies from "js-cookie";
import Forms from "./components/Forms";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
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
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>The Subliminals</h1>
      {isAuth ? <Logout setIsAuth={setIsAuth} /> : <Forms setIsAuth={setIsAuth} />}
    </main>
  );
}
