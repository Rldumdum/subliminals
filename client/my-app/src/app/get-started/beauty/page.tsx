"use client";
import NavBar from "@/app/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/app/store/app-context";
import Cookies from "js-cookie";
import axios from "axios";

const data1 = Array.from({ length: 10 }, (_, i) => i + 1);
const Beauty = () => {
  const { selected, setSelected, isAuth, setData, data } =
    useContext(AppContext);

  if (isAuth) {
    if (data.length <= 0) {
      const fetchData = async () => {
        const response = await axios.get("/api/assets/beauty", {
          headers: {
            authorization: `${Cookies.get("Authorization")}`,
          },
        });
        const data = response.data;
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
        <h1>Beauty</h1>
        <Link href="/get-started/beauty/chapter-1">PROCEED</Link>
      </main>
    </>
  );
};

export default Beauty;
