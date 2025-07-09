"use client";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import LoadingSpinner from "@/components/spinner/loadingSpinner";
import { useSnippetContext } from "@/context/snippetContext";
import { useUserContext } from "@/context/userContext";
import { ISnippet } from "@/types/types";
import useUserRedirect from "@/hooks/useUserRedirect";
import React, { useEffect } from "react";

const Page = () => {
  useUserRedirect("/login");
  const { getUserSnippets, userSnippets, loading } = useSnippetContext();
  const userId = useUserContext().user?._id;

  useEffect(() => {
    if (userId) {
      getUserSnippets();
    }
  }, [userId, getUserSnippets]);

  return (
    <main>
      {userId && <Categories />}
      <div className="min-h-[100vh] px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {loading ? (
          <LoadingSpinner />
        ) : (
          userSnippets?.snippets?.map((snippet: ISnippet) => {
            return <Snippet key={snippet._id} snippet={snippet} />;
          })
        )}

        {userSnippets?.snippets?.length === 0 && (
          <div className="flex items-center justify-center h-[90vh]">
            <h1 className="text-4xl text-red-500">No Snippets Found.</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
