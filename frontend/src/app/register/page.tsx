import React from "react";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-[93vh] w-full flex items-center justify-center">
      <div className="w-[80%] h-[90%] flex flex-col md:flex-row bg-[#181818]">
        {/* Left Side */}
        <div className="flex-1 min-h-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#232526] to-[#181818] rounded-none md:rounded-tl-3xl md:rounded-bl-3xl">
          {/* Optional: Glass background image overlay */}
          <Image
            src="/glass-bg.png"
            alt="background glass"
            fill
            className="object-cover opacity-20 pointer-events-none select-none"
          />
          <div className="relative z-10 w-[80%] max-w-xl text-center p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Join Snippy Today!
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-2">
              Create your free account and start sharing, discovering, and
              managing code snippets with the{" "}
              <span className="text-[#6EE7B7] font-semibold">Snippy</span>{" "}
              community.
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 min-h-full flex items-center justify-center bg-[#181818]">
          <div className="w-full h-full flex flex-col justify-center items-center bg-[#232526] border border-white/10 rounded-none md:rounded-tr-3xl md:rounded-br-3xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-white text-center">
              Create Account
            </h2>
            <p className="mb-4 text-gray-400 text-center">
              Sign up to join the Snippy community
            </p>
            <div className="w-full flex justify-center items-center">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
