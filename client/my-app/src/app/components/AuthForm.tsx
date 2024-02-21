import Cookies from "js-cookie";
import "../globals.css";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AuthForm = ({ setIsAuth, modalOpen }: any) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [data, setData] = useState<any>(null);

  const onSubmit = async (data: any) => {
    const { username, password } = data;
    const fetchData = async () => {
      const res = await fetch("http://subliminals_server_1/api/account/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      Cookies.set("Authorization", `Bearer ${data.accessToken}`);
      if (data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setData(data);
      return data;
    };
    fetchData();
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => onSubmit(e))}
            className="space-y-4 w-96"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription className="justify-center flex text-red-500">
                    {data ? data.message : ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        {/* modal */}

        <div className="flex-row flex mt-2 w-full justify-between">
          {/* <button
            onClick={() => {
              modalOpen();
            }}
            className=" text-slate-500 bg-red-white hover:bg-white text-sm flex "
          >
            Forgot Password?
          </button> */}
          <button
            onClick={() => {
              modalOpen();
            }}
            className=" text-black bg-white hover:bg-white text-sm flex "
          >
            Create An Account
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
