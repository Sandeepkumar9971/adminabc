"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { signIn } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SigninWithPassword() {
  const router = useRouter()
  const [loading,setloading] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setloading(true)
      try{
       const result =  await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        })
        if(result?.error){
          toast.error('Invaild User')
          setloading(false)
        }
        else{
          router.push('/dashboard')
          toast.success('login Sucessfull');
        }
      }
      catch(e){
        toast.error('Invaild User')
        setloading(false)

      } 
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="mb-2.5 block font-medium text-dark dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none 
            focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
              formik.touched.email && formik.errors.email ? "border-red-500" : ""
            }`}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <Mail />
          </span>
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="mb-2.5 block font-medium text-dark dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none 
            focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
              formik.touched.password && formik.errors.password ? "border-red-500" : ""
            }`}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <Lock />
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between gap-2 py-2">
        <Link
          href="/auth/forgot-password"
          className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          disabled={loading}
        >
         {loading?'Please Wait...':'Sign In'} 
        </button>
      </div>
    </form>
  );
}
