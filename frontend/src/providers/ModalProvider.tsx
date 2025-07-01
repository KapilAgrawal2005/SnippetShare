"use client";
import { useGlobalContext } from "@/context/globalContext";
import AddSnippetModal from "@/components/modals/addSnippetModal";
import React from "react";
import ProfileModal from "@/components/modals/profileModal";
import EmailVerificationModal from "@/components/modals/EmailVerificationModal";

const ModalProvider = () => {
  const { modalMode, isEditing } = useGlobalContext();

  return (
    <div>
      {isEditing && <AddSnippetModal />}
      {modalMode === "profile" && <ProfileModal />}
      {modalMode === "email-verification" && <EmailVerificationModal />}
    </div>
  );
};

export default ModalProvider;
