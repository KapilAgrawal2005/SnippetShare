"use client";
import { useSnippetContext } from "@/context/snippetContext";
import { useUserContext } from "@/context/userContext";
import useUserRedirect from "@/hooks/useUserRedirect";
import React, { useEffect } from "react";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import { ISnippet } from "@/types/types";

function Page() {
  useUserRedirect("/login");
  const userId = useUserContext().user._id;
  const { getLikedSnippets, likedSnippets } = useSnippetContext();

  useEffect(() => {
    if (userId) {
      getLikedSnippets();
    }
  }, [userId, getLikedSnippets]);

  return (
    <main>
      {userId && <Categories />}

      <div className="px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {likedSnippets.snippets?.map((snippet: ISnippet) => (
          <Snippet key={snippet._id} snippet={snippet} />
        ))}
      </div>

      {likedSnippets?.snippets?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-4xl text-red-400">No snippets found!</h1>
        </div>
      )}
    </main>
  );
}

export default Page;
