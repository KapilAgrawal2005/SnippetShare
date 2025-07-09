"use client";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const { forgotPasswordEmail } = useUserContext();

  // state
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordEmail(email);

    // clear input
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-[420px] px-6 py-10 rounded-2xl bg-[#232526]/80 backdrop-blur-md border border-white/10 shadow-xl"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-2xl font-bold text-white tracking-wide">
          Enter email to reset password
        </h1>
        <div className="mt-6 flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            placeholder="johndoe@gmail.com"
            className="px-4 py-3 bg-[#181818] border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all"
            autoComplete="email"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="mt-6 flex-1 px-4 py-3 font-bold bg-[#6EE7B7] text-[#181818] rounded-lg hover:bg-[#2ECC71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            Reset Password
          </button>
        </div>
        <div className="mt-6 w-full flex justify-center">
          <Link
            href="/login"
            className="text-[#6EE7B7] hover:underline text-sm font-medium transition-colors"
          >
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
