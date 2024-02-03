"use client";
import NavBar from "@/app/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/app/store/app-context";
import Cookies from "js-cookie";

const data1 = Array.from({ length: 10 }, (_, i) => i + 1);
const Beauty = () => {
  const { selected, setSelected, isAuth, setData, data } =
    useContext(AppContext);

  if (isAuth) {
    if (data.length <= 0) {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:3001/api/assets/mental-health",
          {
            method: "GET",
            headers: {
              authorization: `${Cookies.get("Authorization")}`,
            },
          }
        );
        const data = await response.json();
        setData(data.response.resources);
      };
      fetchData();
    }
  } else {
    console.log("you don't have access to the data");
  }
  const handleChapterClick = (chapter: number) => {
    setSelected(chapter);
  };

  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1>Mental Health</h1>
        <Link href="/get-started/mental-health/chapter-1">PROCEED</Link>
      </main>
    </>
  );
};

export default Beauty;
