"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

const RegisterForm = () => {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form
      onSubmit={registerUser}
      className="relative w-full max-w-[420px] px-6 py-10 rounded-2xl bg-[#232526]/80 backdrop-blur-md border border-white/10 shadow-xl"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-2xl font-bold text-white tracking-wide">
          Register for an Account
        </h1>
        <p className="mb-6 px-4 text-center text-gray-400 text-[15px]">
          Create an account. Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-[#6EE7B7] hover:text-[#2ECC71] transition-all duration-300"
          >
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-300 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name="name"
            className="px-4 py-3 bg-[#181818] border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all"
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-300 font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="px-4 py-3 bg-[#181818] border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
          />
        </div>
        <div className="relative mt-4 flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-300 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="px-4 py-3 bg-[#181818] border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all"
            placeholder="***************"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[20px] text-gray-400 hover:text-[#6EE7B7] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            className="mt-6 flex-1 px-4 py-3 font-bold bg-[#6EE7B7] text-[#181818] rounded-lg hover:bg-[#2ECC71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            Register Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
