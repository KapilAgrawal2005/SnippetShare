"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/../public/logo.png";
import SearchInput from "../searchInput/searchInput";
import { login, register } from "@/utils/Icons";
import { useRouter } from "next/navigation";
const Header = () => {
  const { user } = useUserContext();

  const photo = user?.photo;

  const router = useRouter();
  return (
    <div className="fixed z-20 top-0 w-full px-8 flex items-center justify-between bg-[#252525] border-b-[2px] border-[#ffffff1a] h-[10vh]">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={logo}
          alt="Logo"
          width={25}
          height={25}
          className="ml=[1px]"
        />
        <h1 className="flex items-center text-white text-2xl font-bold">
          Snippy
        </h1>
      </Link>

      <div className="lg:flex hidden">
        <SearchInput />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="btn-hover relative h-[47px] px-8 bg-[#3A3B3C] flex items-center justify-center gap-4 rounded-xl overflow-hidden hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          <span className="text-xl text-gray-200">{login}</span>
          <span className="font-bold text-white">Login</span>
          <div className="blob"></div>
        </button>
        <button
          className="btn-hover relative h-[47px] px-8 bg-[#7263F3] flex items-center justify-center gap-4 rounded-xl overflow-hidden hover:cursor-pointer"
          onClick={() => router.push("/register")}
        >
          <span className="text-xl text-gray-200">{register}</span>
          <span className="font-bold text-white">Register</span>
          <div className="blob"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;
