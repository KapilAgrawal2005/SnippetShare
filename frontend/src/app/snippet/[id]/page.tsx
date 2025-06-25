"use client";
import Snippet from "@/components/snippets/snippet";
import LoadingSpinner from "@/components/spinner/loadingSpinner";
import { useSnippetContext } from "@/context/snippetContext";
import { ISnippet } from "@/types/types";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}
const page = ({ params: { id } }: Props) => {
  const { getPublicSnippetById } = useSnippetContext();

  const [snippet, setSnippet] = useState({} as ISnippet);

  const snippetId = id.split("-").at(-1);

  useEffect(() => {
    (async () => {
      const res = await getPublicSnippetById(snippetId);
      setSnippet(res);
    })();
  }, [snippetId]);

  return (
    <main className="p-8 relative min-h-[90vh]">
      {snippet.title ? (
        <Snippet snippet={snippet} height="640px" />
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};

export default page;
