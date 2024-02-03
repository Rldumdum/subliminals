"use client";
import NavBar from "@/app/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/app/store/app-context";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import VideoPlayer from "./VideoPlayer";
const data1 = Array.from({ length: 10 }, (_, i) => i + 1);
// const days = Array.from(Array(31).keys());A
const SlugPage = ({tab}: any) => {
  const params = useParams();
  console.log(params);
  const { selected, setSelected, data, isAuth, setData } =
    useContext(AppContext);
  const handleChapterClick = (chapter: number) => {
    setSelected(chapter - 2);
  };
  if (isAuth) {
    if (data.length <= 0) {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:3001/api/assets/${tab}`,
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
  let page: string = params.slug[0].split("-")[1];
  let pageNumber: number = parseInt(page);
  useEffect(() => setSelected(pageNumber - 2), []);
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-4xl">{tab.toUpperCase()}</h1>
        <div className="bg-red-500 w-full h-20 grid grid-cols-6">
          <div className="bg-blue-500 overflow-x-auto h-screen col-span-1">
            <Link href={`/get-started/beauty/chapter-1`}>
              <div
                className={
                  " rounded-full border-2 border-black my-2 px-2 py-3 cursor-pointer  " +
                  (selected === -1  ? "bg-red-500 text-white" : "bg-orange-500")
                }
                onClick={() => handleChapterClick(1)}
              >
                <h1>Chapter: {1} </h1>
                <h1>Chapter: {params.slug} </h1>
              </div>
            </Link>
            {!isAuth
              ? data1.map((d: any) => {
                  return (
                    <div
                      key={d}
                      className=" rounded-full border-2 border-black my-2 px-2 py-3 cursor-pointer bg-slate-500  "
                    >
                      <h1>Please Log In </h1>
                    </div>
                  );
                })
              : data.map((d: any) => {
                  let chapter = d.public_id
                    .split("/")[1]
                    .split("-")[1]
                    .split("_")[0];
                  return (
                    <Link
                      href={`/get-started/beauty/chapter-${chapter}`}
                      key={d.public_id}
                    >
                      <div
                        className={
                          " rounded-full border-2 border-black my-2 px-2 py-3 cursor-pointer  " +
                          (selected === chapter - 2
                            ? "bg-red-500 text-white"
                            : "bg-orange-500")
                        }
                        onClick={() => handleChapterClick(chapter)}
                      >
                        <h1>Chapter: {chapter} </h1>
                      </div>
                    </Link>
                  );
                })}
          </div>
          <div className="bg-green-500  col-span-4">
            {selected < -1 ? (
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

export default SlugPage;
