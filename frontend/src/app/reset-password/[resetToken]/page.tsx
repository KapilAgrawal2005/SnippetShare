"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{
    resetToken: string;
  }>;
}

const Page = ({ params }: Props) => {
  const { resetPassword } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setResetToken(resolvedParams.resetToken);
    };
    getParams();
  }, [params]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    resetPassword(resetToken, password);
  };

  return (
    <main className="w-full h-[92vh] flex justify-center items-center bg-[#181818] relative overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[420px] px-8 py-12 rounded-3xl bg-[#232526]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
      >
        {/* Logo/Icon */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={56}
          height={56}
          className="mb-2"
        />
        <h1 className="text-2xl font-extrabold text-white tracking-wide mb-1 text-center drop-shadow-lg">
          Reset your password
        </h1>
        <p className="text-gray-300 text-center text-sm max-w-xs mb-6">
          Enter your new password below to reset your account password.
        </p>
        {/* New Password */}
        <div className="mt-2 w-full flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-200 font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              <FiLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              name="password"
              placeholder="*********"
              className="pl-10 pr-10 py-3 bg-[#181818]/80 border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all w-full shadow-sm"
              required
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-[#6EE7B7] transition-colors"
              onClick={() => setShowPassword((v) => !v)}
              type="button"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div className="mt-4 w-full flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-gray-200 font-medium mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              <FiLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*********"
              className="pl-10 pr-10 py-3 bg-[#181818]/80 border border-white/10 rounded-lg outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#6EE7B7] transition-all w-full shadow-sm"
              required
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-[#6EE7B7] transition-colors"
              onClick={() => setShowConfirmPassword((v) => !v)}
              type="button"
              tabIndex={-1}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full flex-1 px-4 py-3 font-bold bg-[#6EE7B7] text-[#181818] rounded-lg hover:bg-[#2ECC71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        >
          Reset Password
        </button>
        <div className="mt-6 w-full flex justify-center">
          <Link
            href="/login"
            className="text-[#6EE7B7] hover:underline text-sm font-medium transition-colors"
          >
            &larr; Back to Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Page;
