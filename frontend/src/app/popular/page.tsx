"use client";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import LoadingSpinner from "@/components/spinner/loadingSpinner";
import { useSnippetContext } from "@/context/snippetContext";
import { ISnippet } from "@/types/types";
import React from "react";

function page() {
  const { popularSnippets, loading } = useSnippetContext();

  console.log("Popular Snippets:", popularSnippets);
  return (
    <main>
      <Categories />

      <div className="min-h-[100vh] px-8 pt-[6.3rem] pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {loading ? (
          <LoadingSpinner />
        ) : (
          popularSnippets?.snippets?.map((snippet: ISnippet) => (
            <Snippet key={snippet._id} snippet={snippet} />
          ))
        )}
      </div>

      {popularSnippets?.snippets?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-4xl text-red-400">No snippets found!</h1>
        </div>
      )}
    </main>
  );
}

export default page;
