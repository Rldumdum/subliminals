"use client";
import NavBar from "@/app/components/Navbar";
import React, { useContext, useState } from "react";
import Link from "next/link";
import VideoPlayer from "./video";
import { AppContext } from "@/app/store/app-context";

const data1 = Array.from({ length: 10 }, (_, i) => i + 1);
// const days = Array.from(Array(31).keys());A
const Beauty = () => {
  const { selected, setSelected, data } = useContext(AppContext);
  const handleChapterClick = (chapter: number) => {
    setSelected(chapter);
  };


  console.log(selected);
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-4xl">Beauty</h1>
        <div className="bg-red-500 w-full h-20 grid grid-cols-6">
          <div className="bg-blue-500 overflow-x-auto h-screen col-span-1">
            {data1.map((d) => (
              <Link href={`/get-started/beauty/chapter-${d}`} key={d}>
                <div
                  key={d}
                  className={
                    " rounded-full border-2 border-black my-2 px-2 py-3 cursor-pointer " +
                    (selected === d ? "bg-green-500" : "bg-orange-500")
                  }
                  onClick={() => handleChapterClick(d)}
                >
                  <h1>Chapter: {d} </h1>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-green-500  col-span-4">
            {!selected ? (
              "To start with, please select a chapter"
            ) : (
              <>
                <VideoPlayer params={{ slug: `chapter-${selected}` }} />
              </>
            )}
          </div>
          <div className="bg-yellow-500 col-span-1">Notes</div>
        </div>
      </main>
    </>
  );
};

export default Beauty;
