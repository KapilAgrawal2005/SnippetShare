"use client";
import { useGlobalContext } from "@/context/globalContext";
import AddSnippetModal from "@/components/modals/addSnippetModal";
import React from "react";
import ProfileModal from "@/components/modals/profileModal";

const ModalProvider = () => {
  const { modalMode, isEditing } = useGlobalContext();

  return (
    <div>
      {isEditing && <AddSnippetModal />}
      {modalMode === "profile" && <ProfileModal />}
    </div>
  );
};

export default ModalProvider;
