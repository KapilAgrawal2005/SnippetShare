"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { SnippetProvider } from "../context/snippetContext";
import { GlobalProvider } from "../context/globalContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <GlobalProvider>
        <SnippetProvider>{children}</SnippetProvider>
      </GlobalProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
