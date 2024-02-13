"use client";
import { useContext, useEffect, useState } from "react";
import Logout from "./components/Logout";
import Cookies from "js-cookie";
import Forms from "./components/Forms";
import NavBar from "./components/Navbar";
import { AppContext } from "./store/app-context";
import Link from "next/link";
const tracks = [
  {
    url: "audio/Introduction.mp3",
    title: "Introduction",
    tags: ["house"],
  },
];

export default function Home() {
  const { isAuth, setIsAuth } = useContext(AppContext);
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-5xl ">The Subliminals</h1>
        <p className="text-2xl text-black mt-10">
          Change how your brain is wired and be something that you want to
          become.
        </p>
        <p className="text-2xl text-black mb-10">
          A new way to change your life.
        </p>
        <Link href="/get-started" className="p-5 bg-black text-white">
          Get Started
        </Link>
      </main>
    </>
  );
}
