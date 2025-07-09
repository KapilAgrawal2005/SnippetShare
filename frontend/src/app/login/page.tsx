import React from "react";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
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
              Unlock, Share, and Discover Code Snippets Effortlessly
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-2">
              Join the{" "}
              <span className="text-[#6EE7B7] font-semibold">Snippy</span>{" "}
              community and supercharge your coding journey!
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 min-h-full flex items-center justify-center bg-[#181818] p-0">
          <div className="w-full h-full flex flex-col justify-center items-center bg-[#232526] border border-white/10 rounded-none md:rounded-tr-3xl md:rounded-br-3xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-white text-center">
              Welcome Back
            </h2>
            <p className="mb-8 text-gray-400 text-center">
              Log in to your account to continue
            </p>
            <div className="w-full flex justify-center items-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
