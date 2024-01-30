"use client";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import Cookies from "js-cookie";
import Forms from "./components/Forms";
import NavBar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-5xl ">The Subliminals</h1>
        <p className="text-2xl text-black m-10">Be something that you want but first, change the way your brain is wired </p>
        <button className="p-5 bg-black text-white">Get Started</button>
      </main>
    </>
  );
}
