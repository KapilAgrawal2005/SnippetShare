"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

const EmailVerificationModal = () => {
  const { closeModal } = useGlobalContext();
  const { emailVerification } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = async () => {
    setLoading(true);
    const res = await emailVerification();
    setLoading(false);
    closeModal();
  };

  return (
    <div className="fixed top-0 right-0 z-40 h-full w-full bg-[#000]/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#252525] rounded-lg p-8 max-w-md w-full shadow-lg border border-yellow-500/30">
        <h2 className="text-yellow-400 text-2xl font-bold mb-4">
          Email Not Verified
        </h2>
        <p className="text-gray-200 mb-6">
          Your email is not verified. Please verify your email to create
          snippets.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            onClick={handleEmailVerification}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification Email"}
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
