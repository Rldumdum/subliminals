"use client";
import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import Logout from "./components/Logout";
import Cookies from "js-cookie";

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
      <h1>Welcome</h1>
      {isAuth ? <Logout setIsAuth={setIsAuth} /> : <AuthForm setIsAuth={setIsAuth} />}
    </main>
  );
}
