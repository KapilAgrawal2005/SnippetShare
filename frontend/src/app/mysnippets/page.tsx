"use client";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import { useSnippetContext } from "@/context/snippetContext";
import { useUserContext } from "@/context/userContext";
import { ISnippet } from "@/types/types";
import React, { useEffect } from "react";

const page = () => {
  const { getUserSnippets, userSnippets } = useSnippetContext();
  const userId = useUserContext().user?._id;

  useEffect(() => {
    if (userId) {
      getUserSnippets();
    }
  }, [userId]);

  return (
    <main>
      {userId && <Categories />}
      <div className="px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {userSnippets?.snippets?.map((snippet: ISnippet) => {
          return <Snippet key={snippet._id} snippet={snippet} />;
        })}

        {userSnippets?.snippets?.length === 0 && (
          <div className="flex items-center justify-center h-[90vh]">
            <h1 className="text-4xl text-red-500">No Snippets Found.</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
