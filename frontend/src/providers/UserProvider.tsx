"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { SnippetsProvider } from "../context/snippetContext";
import { GlobalProvider } from "../context/globalContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <GlobalProvider>
        <SnippetsProvider>{children}</SnippetsProvider>
      </GlobalProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
