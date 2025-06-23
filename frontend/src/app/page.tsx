"use client";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import { useSnippetContext } from "@/context/snippetContext";
import { ISnippet } from "@/types/types";

export default function Home() {
  const { publicSnippets } = useSnippetContext();
  return (
    <div>
      <Categories />
      <div
        className={`px-8 pt-[6.3rem] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6`}
      >
        {publicSnippets.map((snippet: ISnippet) => {
          return <Snippet key={snippet._id} snippet={snippet} />;
        })}
      </div>

      {publicSnippets.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-4xl text-red-400">No snippets found!</h1>
        </div>
      )}
    </div>
  );
}
