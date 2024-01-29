import Cookies from "js-cookie";
import "../globals.css";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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

const AuthForm = ({ setIsAuth }: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const { username, password } = data;
    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/api/account/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();

      Cookies.set("Authorization", `Bearer ${data.accessToken}`);
      if (data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      return data;
    };
    fetchData();
  };

  return (
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
                  <Input placeholder="John Doe" {...field} />
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

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={modalClose}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <div className="flex-row flex mt-2">
        <button
          onClick={() => {
            modalOpen();
          }}
          className="w-full text-black bg-white hover:bg-white text-sm flex justify-start"
        >
          Forgot Password?
        </button>
        <button
          onClick={() => {
            modalOpen();
          }}
          className="w-full text-black bg-white hover:bg-white text-sm flex justify-end"
        >
          Create An Account
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
