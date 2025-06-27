"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form
      className="relative w-full max-w-[420px] px-6 py-10 rounded-2xl bg-[#232526]/80 backdrop-blur-md border border-white/10 shadow-xl"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-2xl font-bold text-white tracking-wide">
          Login to Your Account
        </h1>
        <p className="mb-8 px-4 text-center text-gray-400 text-[15px]">
          Login now. Don't have an account?{" "}
          <a
            href="/register"
            className="font-bold text-[#6EE7B7] hover:text-[#2ECC71] transition-all duration-300"
          >
            Register here
          </a>
        </p>

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
            autoComplete="current-password"
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
        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#6EE7B7] text-[14px] hover:text-[#2ECC71] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            className="mt-6 flex-1 px-4 py-3 font-bold bg-[#6EE7B7] text-[#181818] rounded-lg hover:bg-[#2ECC71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            Login Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
