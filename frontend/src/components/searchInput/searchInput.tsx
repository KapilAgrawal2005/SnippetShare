"use client";
import React from "react";
import SearchIcon from "../../../public/Icons/SearchIcon";
interface Props {
  wFull?: boolean;
}
const SearchInput = ({ wFull }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <form
      className={`relative flex gap-4 overflow-hidden ${
        wFull ? "w-full" : "md:w-[580px]"
      }`}
    >
      <div className="absolute top-[50%] left-3 translate-y-[-50%]">
        <SearchIcon stroke="rgba(249,249,249,0.6)" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`pl-10 pr-2 py-2 bg-[#212121] text-gray-200 font-medium border-[2px] border-[#ffffff1a] rounded-lg outline-none transition-all duration-300 ease-in-out focus:w-full focus:border-[#ffffff4d] ${
          wFull ? "w-full" : "w-[90%]"
        }`}
      />
      {!searchQuery && (
        <span className="absolute top-[50%] left-10 translate-y-[-50%] text-gray-400 pointer-events-none text-nowrap">
          Search for snippets e.g. Nested Loops etc.
        </span>
      )}
    </form>
  );
};

export default SearchInput;
