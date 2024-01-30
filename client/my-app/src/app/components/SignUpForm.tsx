import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import Modal from "react-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
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

const formSchema: any = z
  .object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    birthday_mm: z.string().min(1, {
      message: "You must choose a month.",
    }),
    birthday_dd: z.string().min(1, {
      message: "You must choose a day.",
    }),
    birthday_yyyy: z.string().min(4, {
      message: "You must choose a year.",
    }),
    gender: z.string().min(2, {
      message: "You must select a gender.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const currentMonth = new Date().getMonth();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDay = new Date().getDate();
// const days = Array.from(Array(31).keys());A
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1905 + 1 },
  (_, i) => currentYear - i
);

const SignUpForm = ({ setIsAuth, modalClose, modalIsOpen }: any) => {
  const [data, setData] = useState<any>(null);
  const [accountCreated, setAccountCreated] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: any) => {
    const {
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
      birthday_mm,
      birthday_dd,
      birthday_yyyy,
      gender,
    } = data;
    setIsSubmitting(true);

    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/api/account/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          confirmPassword,
          birthday: `${birthday_mm} ${birthday_dd} ${birthday_yyyy}`,
          gender,
        }),
      });

      const data = await res.json();
      if (data) {
        setIsSubmitting(false);
      }
      console.log(data);
      if (data.username) {
        setAccountCreated(true);
        setTimeout(() => {
          modalClose();
        }, 2000)
      }
      else{
        setAccountCreated(false);
      }

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
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p className="text-green-800">
        {accountCreated ? "Account has been successfully created!" : ""}
      </p>
      <button onClick={modalClose} className=" flex ml-auto ">
        X
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => onSubmit(e))}
          className="space-y-4 w-96"
        >
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Birthday</FormLabel>
          <div className="flex flex-row w-full flex-grow space-x-2">
            <FormField
              control={form.control}
              name="birthday_mm"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={months[currentMonth]} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday_dd"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={currentDay} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday_yyyy"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={currentYear} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full ">
            {isSubmitting ? (
              <Image
                src="/images/spinner.mov.gif"
                alt="spinner"
                width={50}
                height={50}
              />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default SignUpForm;
