"use client";
import { useGlobalContext } from "@/context/globalContext";
import AddSnippetModal from "@/components/modals/addSnippetModal";
import React from "react";

const ModalProvider = () => {
  const { modalMode, isEditing } = useGlobalContext();

  return <div>{isEditing && <AddSnippetModal />}</div>;
};

export default ModalProvider;
