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
import { Switch } from "@/components/ui/switch";

const data = [
  {
    title: "Money",
    description: "Maximize your earning potentials",
    content: "WOW",
    footer: "Click Here",
  },
  {
    title: "Mental Health",
    description: "Develop your mental",
    content: "WOW",
    footer: "Click Here",
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
        {data.map((d) => (
          <Card>
            <CardHeader>
              <CardTitle>{d.title}</CardTitle>
              <CardDescription>{d.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{d.content}</p>
            </CardContent>
            <CardFooter>
              <p>{d.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </main>
    </>
  );
};

export default Getstarted;
