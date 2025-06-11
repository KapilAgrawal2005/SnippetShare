import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
interface Props {
  children: React.ReactNode;
}

const ContentProvider = ({ children }: Props) => {
  return (
    <div className="relative">
      <Sidebar />
      <div className="mt-[8vh]">{children}</div>
    </div>
  );
};

export default ContentProvider;
