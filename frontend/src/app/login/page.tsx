import React from "react";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

const page = () =>{
  return (
    <div className="bg-[#181818] auth-page w-full h-full flex justify-center items-center my-30">
      <div className="h-[500px] w-[600px] text-white">Hii</div>
      <LoginForm />
    </div>
  );
}

export default page;
