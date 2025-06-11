import React from "react";

function SearchIcon({ stroke = "black" }: { stroke: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M14.927 15.0401L18.4001 18.4001M9.4001 5.2001C11.3883 5.2001 13.0001 6.81187 13.0001 8.8001M17.2801 9.4401C17.2801 13.77 13.77 17.2801 9.4401 17.2801C5.11018 17.2801 1.6001 13.77 1.6001 9.4401C1.6001 5.11018 5.11018 1.6001 9.4401 1.6001C13.77 1.6001 17.2801 5.11018 17.2801 9.4401Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SearchIcon;
