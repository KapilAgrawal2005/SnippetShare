"use client";
import React from "react";
import { useUserContext } from "@/context/userContext";
import {
  arrowLeft,
  bars,
  bookmarkIcon,
  box,
  fire,
  gear,
  help,
  home,
  users,
} from "@/utils/Icons";
import Link from "next/link";

import { useRouter } from "nextjs-toploader/app";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const { user } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      name: isSidebarOpen ? "Home" : "",
      url: "/",
      icon: home,
    },

    {
      id: 4,
      name: isSidebarOpen ? "Popular" : "",
      url: "/popular",
      icon: fire,
    },
    {
      id: 5,
      name: isSidebarOpen ? "Top Creators" : "",
      url: `${user ? "/leaderboard" : "/login"}`,
      icon: users,
    },
    {
      id: 2,
      name: isSidebarOpen ? "Favourites" : "",
      url: `${user ? "/favourites" : "/login"}`,
      icon: bookmarkIcon,
    },
    {
      id: 3,
      name: isSidebarOpen ? "My Snippets" : "",
      url: `${user ? "/snippets" : "/login"}`,
      icon: box,
    },
    {
      id: 1,
      name: isSidebarOpen ? "Settings" : "",
      url: `${user._id ? "/profile/update" : "/login"}`,
      icon: gear,
    },
    {
      id: 2,
      name: isSidebarOpen ? "Help" : "",
      url: "/help",
      icon: help,
    },
  ];

  const getIconColor = (url: string) => {
    return pathname === url ? "#aaa" : "#71717a";
  };

  return (
    <div
      className={`fixed z-20 bg-[#212121] h-full border-r-[2px] border-[#ffffff0d] ${
        isSidebarOpen ? "w-[15rem]" : "w-[5.2rem]"
      }`}
    >
      <span
        className="u-shadow-2 w-[45px] absolute z-50 top-[21px] right-[-47px] py-[0.8rem] bg-[#252525] cursor-pointer
        text-xl text-gray-400 flex items-center justify-center rounded-tr-lg rounded-br-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? arrowLeft : bars}
      </span>
      <nav className="h-full flex flex-col justify-between">
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <ul>
            {menu.slice(0, -2).map((item) => {
              return (
                <li
                  key={item.id}
                  className={`sidebar-nav-item my-[.3rem] px-8 py-[.6rem] cursor-pointer ${
                    pathname === item.url && "active-nav-item"
                  }`}
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  <Link
                    href={item.url}
                    className="grid grid-cols-[40px_1fr] items-center text-gray-200"
                  >
                    <span
                      className="text-lg"
                      style={{ color: getIconColor(item.url) }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className={`${isSidebarOpen ? "mb-2" : "mb-[5.5rem]"}`}>
            {menu.slice(-2).map((item) => {
              return (
                <li
                  key={item.id}
                  className={`sidebar-nav-item my-[.3rem] px-8 py-[.6rem] cursor-pointer ${
                    pathname === item.url && "active-nav-item"
                  }`}
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  <Link
                    href={item.url}
                    className="grid grid-cols-[40px_1fr] items-center text-gray-200"
                  >
                    <span
                      className="text-lg"
                      style={{ color: getIconColor(item.url) }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {isSidebarOpen && (
          <footer className="mb-[5rem] p-4 border-t-[2px] border-rgba-3 text-gray-300">
            <ul className="flex items-center justify-center gap-4">
              <li>
                <Link
                  href="/terms"
                  className="underline text-sm hover:text-green-400"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="underline text-sm hover:text-green-400"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="underline text-sm hover:text-green-400"
                >
                  Help
                </Link>
              </li>
            </ul>
            <p className="text-center text-sm mt-4">
              &copy; {new Date().getFullYear()}{" "}
              <Link href={"/"}>Kapil Agrawal</Link>. All&nbsp;rights reserved.
            </p>
          </footer>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
