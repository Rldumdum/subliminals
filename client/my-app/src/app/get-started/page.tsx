import React from "react";
import NavBar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    title: "Beauty",
    path: "/get-started/beauty",
    description: "Minmax your beauty",
    image: "/images/600x400.svg",
  },
  {
    title: "Mental Health",
    path: "/get-started/mental-health",
    description: "Develop your mental",
    image: "/images/600x400.svg",
  },
];

const Getstarted = () => {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1>Introduction</h1>
        <h1 className="text-2xl mt-5">sub·lim·i·nal</h1>
        <p className="text-xl text-slate-600">/səˈblimən(ə)l/</p>
        <section className="flex gap-10 mt-10">
          {data.map((d) => (
            <Card key={d.title} className="w-80 flex flex-col items-center  ">
              <CardHeader>
                <CardTitle className="self-center">{d.title}</CardTitle>
                <CardDescription>{d.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={d.image} alt={d.image} width={200} height={200} />
              </CardContent>
              <CardFooter>
                <Link href={d.path}>
                  <Button>Try It Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default Getstarted;
