"use client";
import { useUserContext } from "@/context/userContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{
    verificationToken: string;
  }>;
}

const Page = ({ params }: Props) => {
  const [verificationToken, setVerificationToken] = useState<string>("");
  const router = useRouter();
  const { verifyUser } = useUserContext();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message] = useState("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setVerificationToken(resolvedParams.verificationToken);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const handleVerification = async () => {
      try {
        setVerificationStatus("loading");

        await verifyUser(verificationToken);

        setVerificationStatus("success");
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        setVerificationStatus("error");
        console.log("Error while verifying the user email: ", error);
      }
    };

    if (verificationToken) {
      handleVerification();
    }
  }, [router, verificationToken, verifyUser]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center bg-[#1a1a1a]">
      <div className="u-shadow-2 px-8 mx-8 py-8 bg-[#252525] rounded-lg max-w-[500px] w-full text-center">
        <h1 className="text-gray-200 text-2xl font-semibold mb-6">
          Email Verification
        </h1>

        {verificationStatus === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300">Verifying your email...</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-green-400 text-xl font-medium mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-300">{message}</p>
              <p className="text-gray-400 text-sm mt-2">
                Redirecting to home page...
              </p>
            </div>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-red-400 text-xl font-medium mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-300">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
