"use client";
import { useUserContext } from "@/context/userContext";
import { envelope, github, linkedin } from "@/utils/Icons";
import Image from "next/image";
import React from "react";
import useUserRedirect from "@/hooks/useUserRedirect";
function page() {
  useUserRedirect("/login");
  const {
    user,
    updateUser,
    changePassword,
    userState,
    handlerUserInput,
    emailVerification,
    loading,
  } = useUserContext();

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handlePasswordChange = async (e: any) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  return (
    <main className="min-h-[100vh] relative flex justify-center items-center">
      <form
        action=""
        className="u-shadow-2 px-8 mx-8 my-8 py-6 bg-[#252525] rounded-lg max-w-[1200px] w-full"
        onSubmit={(e) => {
          e.preventDefault();
          updateUser(e, userState);
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="file-upload" className="text-gray-200">
            Add Profile Picture
          </label>
          <div>
            <label
              htmlFor="file-upload"
              className="py-4 flex items-center justify-center border-2 border-dashed border-[#ffffff1a] rounded-lg cursor-pointer"
            >
              <Image
                width={100}
                height={100}
                src={user?.photo || "/image--user.png"}
                alt="profile picture"
                className="rounded-lg"
              />
            </label>
            <input id="file-upload" type="file" className="hidden" />
          </div>

          {/* Email Verification Section */}
          {user && !user.isVerified && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-yellow-400 font-medium">
                    Email Not Verified
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Please verify your email address to access all features.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={emailVerification}
                  disabled={loading}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? "Sending..." : "Verify Email"}
                </button>
              </div>
            </div>
          )}

          <label htmlFor="github" className="mt-4 text-gray-300">
            Add Social Links
          </label>

          <div className="flex-1 grid gap-4 grid-cols-[repeat(auto-fill,minmax(290px,1fr))]">
            <div className="relative w-full">
              <label
                htmlFor="github"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {github}
              </label>

              <input
                id="github"
                name="github"
                type="text"
                defaultValue={user?.github}
                onChange={(e) => handlerUserInput("github")(e)}
                placeholder="Github"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none"
              />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="linkedin"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {linkedin}
              </label>

              <input
                id="linkedin"
                name="linkedin"
                type="text"
                defaultValue={user?.linkedin}
                onChange={(e) => handlerUserInput("linkedin")(e)}
                placeholder="Linkedin"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="publicEmail"
                className="absolute top-[50%] left-[1rem] translate-y-[-50%] text-gray-200 text-2xl"
              >
                {envelope}
              </label>

              <input
                id="publicEmail"
                name="publicEmail"
                type="email"
                defaultValue={user?.publicEmail}
                onChange={(e) => handlerUserInput("publicEmail")(e)}
                placeholder="Public Email"
                className="w-full py-[.8rem] pl-[3.2rem] pr-[1rem] text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none"
              />
            </div>
          </div>

          <div className="w-full mt-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user?.name}
                className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none focus:border-[#6fcf97]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-300">
                Private Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email}
                className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none focus:border-[#6fcf97]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="bio" className="text-gray-300">
                Add Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue={user?.bio}
                onChange={(e) => handlerUserInput("bio")(e)}
                className="w-full py-4 pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none focus:border-[#6fcf97] resize-none"
              />
            </div>

            <div className="w-full mt-4 flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="oldPassword" className="text-gray-300">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  name="oldPassword"
                  className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none focus:border-[#6fcf97]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="newPassword" className="text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  name="newPassword"
                  className="w-full py-[.8rem] pl-4 pr-1 text-gray-200 bg-transparent border-[2px] border-[#ffffff1a] rounded-md outline-none focus:border-[#6fcf97]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4 justify-end">
          <button
            type="button"
            className="py-4 px-8 mt-4 h-[50px] flex justify-center items-center font-medium bg-red-500 text-white rounded-md hover:bg-red-500/50
            transition-all duration-300 ease-in-out"
            onClick={() => changePassword(oldPassword, newPassword)}
          >
            Update Password
          </button>
          <button
            type="submit"
            className="py-4 px-8 mt-4 h-[50px] flex justify-center items-center font-medium bg-blue-500 text-white rounded-md
            hover:bg-blue-500/70 transition-all duration-300 ease-in-out"
          >
            Update Profile
          </button>
        </div>
      </form>
    </main>
  );
}

export default page;
