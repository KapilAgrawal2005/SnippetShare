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
  const { getUserById, user, updateUser } = useUserContext();
  const { getPublicSnippets } = useSnippetContext();

  const params = useParams();
  const id = params.id as string;

  const [snippets, setSnippets] = useState([]);
  const [creatorDetails, setCreatorDetails] = useState({} as IUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
  });

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

  // Populate edit form when creatorDetails changes
  useEffect(() => {
    if (creatorDetails && creatorDetails._id) {
      setEditForm({
        name: creatorDetails.name || "",
        bio: creatorDetails.bio || "",
        github: creatorDetails.github || "",
        linkedin: creatorDetails.linkedin || "",
      });
    }
  }, [creatorDetails]);

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(e, editForm);
      setIsEditing(false);
      // Refresh the creator details
      const updatedDetails = await getUserById(creatorId);
      setCreatorDetails(updatedDetails);
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    setEditForm({
      name: creatorDetails.name || "",
      bio: creatorDetails.bio || "",
      github: creatorDetails.github || "",
      linkedin: creatorDetails.linkedin || "",
    });
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-[#333] p-6 md:p-8 relative">
          {/* Edit Button */}
          {isOwnProfile && (
            <button
              onClick={handleEditToggle}
              className="absolute top-4 right-4 p-3 bg-[#333] hover:bg-blue-500 rounded-full text-white transition-all duration-300 hover:scale-110"
              title={isEditing ? "Cancel editing" : "Edit profile"}
            >
              {edit}
            </button>
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
                {isEditing ? (
                  <div className="mb-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="text-2xl md:text-3xl font-bold text-white bg-transparent border-b-2 border-#white w-full mb-4 outline-none  px-2 py-1"
                      placeholder="Your name"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
                    {creatorDetails?.name || "User"}
                  </h1>
                )}

                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <span className="w-2 h-2 bg-[#6FCF97] rounded-full"></span>
                  <p className="text-sm md:text-base">
                    Joined {joinedOn(creatorDetails?.createdAt)}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  {isEditing ? (
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-[#6FCF97] text-lg">{github}</span>
                        <input
                          type="url"
                          value={editForm.github}
                          onChange={(e) =>
                            handleInputChange("github", e.target.value)
                          }
                          className="flex-1 bg-[#1a1a1a] text-white border border-[#333] rounded px-2 py-1 text-sm outline-none focus:border-[#6FCF97]"
                          placeholder="GitHub URL"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0077B5] text-lg">
                          {linkedin}
                        </span>
                        <input
                          type="url"
                          value={editForm.linkedin}
                          onChange={(e) =>
                            handleInputChange("linkedin", e.target.value)
                          }
                          className="flex-1 bg-[#1a1a1a] text-white border border-[#333] rounded px-2 py-1 text-sm outline-none focus:border-[#6FCF97]"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6FCF97] text-lg">
                          {envelope}
                        </span>
                        <span className="text-gray-300 text-sm">
                          {creatorDetails?.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
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

                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full p-4 bg-[#212121] text-white border-2 border-[#333] rounded-lg outline-none resize-none min-h-[120px]"
                    rows={5}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                      {creatorDetails?.bio || "No bio available yet."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      {isEditing && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-indigo-500 font-bold text-white rounded-xl flex items-center gap-2 cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-red-500 font-bold text-white rounded-xl flex items-center gap-2 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
          {snippets.map((snippet: ISnippet)=>(
            <Snippet snippet={snippet} key={snippet._id }/>
          ))}
        </div>
      </section>
    </main>
  );
};
export default Page;
