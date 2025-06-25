"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useSnippetContext } from "@/context/snippetContext";
import { useUserContext } from "@/context/userContext";
import { gear, signout } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileModal = () => {
  const { logoutUser } = useUserContext();
  const { getPublicSnippets, getPopularSnippets, getLeaderboard } =
    useSnippetContext();
  const { closeModal } = useGlobalContext();
  const router = useRouter();

  const menu = [
    {
      name: "Settings",
      url: "/profile",
      icon: gear,
      onClick: () => {
        closeModal();
        router.push("/profile");
      },
    },
    {
      name: "Sign Out",
      url: "/",
      icon: signout,
      onClick: () => {
        closeModal();
        getPublicSnippets();
        getPopularSnippets();
        getLeaderboard();
        logoutUser();
        router.push("/");
      },
    },
  ];

  return (
    <div className="u-shadow-1 fixed z-30 right-8 top-[4.2rem] bg-[#252525] rounded-lg border border-[#ffffff1a]">
      <nav>
        <ul className="py-1 min-w-[230px]">
          {menu.map((item, index) => (
            <li
              key={index}
              className="sidebar-nav-item my-[.3rem] px-8 py-[.6rem] cursor-pointer"
              onClick={item.onClick}
            >
              <Link
                href={item.url}
                className="grid grid-cols-[40px_1fr] items-center text-gray-200"
              >
                <span className="text-lg text-[#71717a]">{item.icon}</span>
                <span className="ml-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileModal;
