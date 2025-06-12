"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { SnippetProvider } from "../context/snippetContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <SnippetProvider>{children}</SnippetProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
