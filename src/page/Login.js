import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { db, auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .max(15, "Must be less than 15 characters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .max(15, "Must be at least 15 characters"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, data.email, data.password);
    setSuccess(true);
    console.log("Login successfully!");
    if (isValid) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    console.log(data);
  };
  useEffect(() => {
    setFocus("firstName");
  });

  return (
    <div className="w-[500px] mx-auto  p-10 rounded-lg shadow-lg bg-white mt-[100px]">
      {!success ? (
        <form
          className="flex flex-col items-start w-full gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <MyInput
                placeholder={"Enter your firstName"}
                type={"firstName"}
                control={control}
                fieldName={"firstName"}
              >
                FirstName
              </MyInput>
              {errors?.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <MyInput
                placeholder={"Enter your last name"}
                type={"lastName"}
                control={control}
                fieldName={"lastName"}
              >
                LastName
              </MyInput>
              {errors?.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
          </div>

          <MyInput
            placeholder={"Enter your email"}
            type={"email"}
            control={control}
            fieldName={"email"}
          >
            Email
          </MyInput>
          {errors?.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <MyInput
            control={control}
            id={"password"}
            placeholder={"Enter your password"}
            type={"password"}
            fieldName={"password"}
          >
            Password
          </MyInput>
          {errors?.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <button className="w-full py-3 bg-primary rounded-lg text-slate-100 text-[20px] font-bold shadow-lg hover:bg-opacity-20">
            Submit
          </button>
        </form>
      ) : (
        <NavLink to="/">
          <button className="w-full text-white bg-primary font-bold text-[18px] py-3 rounded-lg">
            Watch movies
          </button>
        </NavLink>
      )}
    </div>
  );
};

const MyInput = ({ fieldName, control, id, children, ...props }) => {
  const { field } = useController({
    control: control,
    name: fieldName,
    defaultValue: "",
  });
  return (
    <>
      <label htmlFor={id} className="font-bold">
        {children}
      </label>
      <input
        {...field}
        {...props}
        className="w-full p-3 border border-transparent rounded-lg shadow-lg outline-none bg-slate-100 broder-none text-slate-500 focus:border-primary"
      />
    </>
  );
};
export default Login;
