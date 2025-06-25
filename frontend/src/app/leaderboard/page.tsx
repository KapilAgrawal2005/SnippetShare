"use client";
import { useSnippetContext } from "@/context/snippetContext";
import { IUser } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface LocalUser extends IUser {
  snippetCount: number;
  totalLikes: number;
  score: number;
}

function page() {
  const { leaderboard } = useSnippetContext();

  const router = useRouter();

  const tableHeaders = [
    {
      width: "20%",
      name: "Place",
      position: "text-center",
      roundedTl: "rounded-tl-xl",
      roundedBl: "rounded-bl-xl",
    },
    {
      width: "20%",
      name: "Username",
      position: "text-left",
    },
    {
      width: "20%",
      name: "Total Snippets",
      position: "text-center",
    },
    {
      width: "20%",
      name: "Total Likes",
      position: "text-center",
    },
    {
      width: "20%",
      name: "Score",
      position: "text-center",
      roundedTr: "rounded-tr-xl",
      roundedBr: "rounded-br-xl",
    },
  ];
  console.log(leaderboard);
  return (
    <main className="p-8">
      <h1 className="text-4xl text-white text-center font-bold">Leaderboard</h1>

      <table className="w-full mt-8">
        <thead>
          <tr className="bg-[#ffffff1a] text-gray-200">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                style={{ width: header.width }}
                className={`py-6 text-center ${header.position} ${header.roundedTl} ${header.roundedBl} ${header.roundedTr} ${header.roundedBr}`}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((user: LocalUser, index: number) => (
            <tr
              key={index}
              className={`cursor-pointer text-gray-300 text-center hover:text-white hover:bg-white/5 transition-all duration-300 ease-in-out
                ${index % 2 === 0 ? "bg-[#181818]" : "bg-[#ffffff1a]"}
                `}
              onClick={() => {
                router.push(
                  `/user/${user.name.toLowerCase().split(" ").join("-")}-${
                    user._id
                  }`
                );
              }}
            >
              <td className="py-4 rounded-tl-xl rounded-bl-xl text-sm font-bold">
                {index + 1}
              </td>
              <td className="py-4 flex items-center gap-2">
                <Image
                  src={user.photo}
                  alt={"User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="ml-2 font-bold text-sm">{user.name}</span>
              </td>

              <td className="py-4 font-bold text-sm">{user.snippetCount}</td>
              <td className="py-4 font-bold text-sm">{user.totalLikes}</td>
              <td className="py-4 rounded-tr-xl rounded-br-xl font-bold text-sm">
                {user.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default page;
