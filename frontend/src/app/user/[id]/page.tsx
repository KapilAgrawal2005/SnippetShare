"use client";
import { useUserContext } from "@/context/userContext";
import { ISnippet, IUser } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { joinedOn } from "@/utils/dates";
import Link from "next/link";
import { envelope, github, linkedin, edit, users } from "@/utils/Icons";
import { useSnippetContext } from "@/context/snippetContext";
import Snippet from "@/components/snippets/snippet";

const Page = () => {
  const { getUserById, user } = useUserContext();
  const { getPublicSnippets } = useSnippetContext();

  const params = useParams();
  const id = params.id as string;

  const [snippets, setSnippets] = useState([]);
  const [creatorDetails, setCreatorDetails] = useState({} as IUser);
  const [isLoading, setIsLoading] = useState(true);

  const creatorId = id?.split("-")?.at(-1) || id;

  // Check if the current user is viewing their own profile
  const isOwnProfile = user?._id === creatorId;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userDetails = await getUserById(creatorId);
        setCreatorDetails(userDetails);
      } catch (error) {
        console.log("Error fetching the creator details", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [creatorId, getUserById]);

  useEffect(() => {
    if (creatorId) {
      //ensure user id is available before fetching
      (async () => {
        try {
          setIsLoading(true);
          const res = await getPublicSnippets(creatorId);
          setSnippets(res);
        } catch (error) {
          console.log("Error fetching the creator details", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [creatorId]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-[#333] p-6 md:p-8 relative">
          {/* Edit Button */}
          {isOwnProfile && (
            <Link href={"/profile"}>
              <button
                className="absolute top-4 right-4 p-3 bg-[#333] hover:bg-blue-500 rounded-full text-white transition-all duration-300 hover:scale-110"
              >
                {edit}
              </button>
            </Link>
          )}

          {/* Profile Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Avatar, Name, Join Date */}
            <div className="lg:col-span-1">
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-[#2a2a2a] flex items-center justify-center">
                    <span className="text-2xl md:text-4xl font-bold text-white">
                      {creatorDetails?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Name and Join Date */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
                  {creatorDetails?.name || "User"}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <span className="w-2 h-2 bg-[#6FCF97] rounded-full"></span>
                  <p className="text-sm md:text-base">
                    Joined {joinedOn(creatorDetails?.createdAt)}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  {creatorDetails?.github && (
                    <Link
                      href={creatorDetails.github}
                      target="_blank"
                      className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center hover:bg-[#6FCF97] transition-all duration-300 group"
                      title="GitHub Profile"
                    >
                      <span className="text-white group-hover:text-black text-lg">
                        {github}
                      </span>
                    </Link>
                  )}
                  {creatorDetails?.linkedin && (
                    <Link
                      href={creatorDetails.linkedin}
                      target="_blank"
                      className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center hover:bg-[#0077B5] transition-all duration-300"
                      title="LinkedIn Profile"
                    >
                      <span className="text-white text-lg">{linkedin}</span>
                    </Link>
                  )}
                  {creatorDetails?.email && (
                    <Link
                      href={`mailto:${creatorDetails.email}`}
                      className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center hover:bg-[#6FCF97] transition-all duration-300 group"
                      title="Send Email"
                    >
                      <span className="text-white group-hover:text-black text-lg">
                        {envelope}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Bio */}
            <div className="lg:col-span-2">
              <div className="rounded-xl p-6 border border-[#333]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6FCF97] to-[#5bb885] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {users}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    About Me
                  </h3>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    {creatorDetails?.bio || "No bio available yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snippets Section */}
      <section>
        <div className="mx-auto mt-10 w-[450px] py-4 bg-[#212121] rounded-lg border-2 border-[#ffffff1a]">
          <h1 className="font-bold text-white text-2xl text-center">
            Snippets Created by{" "}
            <span className="text-[#6FCF97] font-bold text-2xl">
              {creatorDetails?.name || "User"}
            </span>
          </h1>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippets.map((snippet: ISnippet) => (
            <Snippet snippet={snippet} key={snippet._id} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Page;
