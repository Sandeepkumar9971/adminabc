"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation } from "react-query";
import { teams_client } from "@/clients/query/teams";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BACK from "@/components/backbutton";

const options = [
  { id: 1, role: "ADMIN" },
  { id: 2, role: "MANAGER" },
  { id: 3, role: "SUPERVISOR" },
  { id: 4, role: "PARTICIPANT" },
  { id: 5, role: "PEER" },
  { id: 6, role: "JUNIOR" },
];

// Zod validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
});

const FormLayout = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter()
  const {mutate} = useMutation(teams_client.add,{
    onSuccess: (data:any) => {
      toast.success('New Member Added Successfully');
      router.push('/dashboard/teams/all')   
    }
  })

  return (
    <div className="flex flex-col gap-9">
      <BACK/>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-semibold text-dark dark:text-white">
            Add New Member
          </h3>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            email: "",
            role: "",
            password: "",
            subordinate: [],
          }}
          validationSchema={toFormikValidationSchema(formSchema)}
          onSubmit={async(values:any) => {
           await mutate(values)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  {/* First Name Input */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      First Name
                    </label>
                    <div className="relative">
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {options.map((item) => (
                      <option key={item.id} value={item.role}>
                        {item.role}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Subordinate selection */}
                <div className="mb-4.5">
                  <label
                    htmlFor="subordinate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subordinates
                  </label>
                  <select
                    id="subordinate"
                    className="w-full rounded-md border border-gray-300 p-2"
                    onChange={(e) =>
                      setFieldValue(
                        "subordinate",
                        Array.from(new Set([...values.subordinate, e.target.value]))
                      )
                    }
                  >
                    <option value="">Select Subordinate</option>
                    <option value="Subordinate 1">Subordinate 1</option>
                    <option value="Subordinate 2">Subordinate 2</option>
                    <option value="Subordinate 3">Subordinate 3</option>
                    <option value="N.A">N.A</option>
                  </select>

                  <div className="mt-2">
                    {values.subordinate.length > 0 && (
                      <ul className="list-disc pl-5">
                        {values.subordinate.map((subordinate:any, index:any) => (
                          <li key={index} className="flex justify-between">
                            {subordinate}
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                setFieldValue(
                                  "subordinate",
                                  values.subordinate.filter(
                                    (item:any) => item !== subordinate
                                  )
                                )
                              }
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ErrorMessage
                    name="subordinate"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Password input with show/hide feature */}
                <div className="mb-4.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="rounded-md w-full bg-primary px-4 py-2 text-white hover:bg-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormLayout;
