"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
interface Props {
  children: React.ReactNode;
}

function ContentProvider({ children }: Props) {
  const { isSidebarOpen } = useGlobalContext();

  const marginClass = isSidebarOpen ? "ml-[15rem]" : "ml-[5.2rem]";

  return (
    <div className="relative">
      <Sidebar />
      <div className={`mt-[8vh] ${marginClass}`}>{children}</div>
    </div>
  );
}

export default ContentProvider;
