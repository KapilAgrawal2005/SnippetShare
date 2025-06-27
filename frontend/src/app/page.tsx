"use client";
import Categories from "@/components/categories/categories";
import Snippet from "@/components/snippets/snippet";
import LoadingSpinner from "@/components/spinner/loadingSpinner";
import { useSnippetContext } from "@/context/snippetContext";
import { ISnippet } from "@/types/types";
import { next, prev } from "@/utils/Icons";
import { useEffect, useState } from "react";

const Home = () => {
  const { getPublicSnippets, getTags, publicSnippets, loading } =
    useSnippetContext();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1); // Decrement the current page
    }
  };

  const handleViewMore = () => {
    if (publicSnippets.length > 0 && publicSnippets.length % 10 === 0) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment the current page
    }
  };

  const fetchSnippets = async () => {
    await getPublicSnippets("", "", "", currentPage);
    await getTags();
  };

  useEffect(() => {
    fetchSnippets();
  }, [currentPage]);

  return (
    <div>
      <Categories />
      <div
        className={`min-h-[100vh] px-8 pt-[6.3rem] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6 relative`}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          publicSnippets.map((snippet: ISnippet) => {
            return <Snippet key={snippet._id} snippet={snippet} />;
          })
        )}
      </div>

      {publicSnippets.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-4xl text-red-400">No snippets found!</h1>
        </div>
      )}

      <div className="mx-8 flex justify-between">
        <div>
          {currentPage > 1 && (
            <button
              className="mt-2 px-8 py-2 flex items-center gap-2 bg-[#7263F3] rounded-lg shadow-sm font-bold text-white
                hover:bg-[#6BBE92] transition-all duration-300 ease-in-out"
              onClick={handlePrevious}
            >
              <span className="pt-[2px] text-lg">{prev}</span>Previous
            </button>
          )}
        </div>

        <div>
          {publicSnippets.length !== 0 && publicSnippets.length % 10 === 0 && (
            <button
              className="mb-8 mt-2 px-8 py-2 flex items-center gap-2 bg-[#7263F3] rounded-lg shadow-sm font-bold text-white
                hover:bg-[#6BBE92] transition-all duration-300 ease-in-out"
              onClick={handleViewMore}
            >
              View More <span className="pt-[2px] text-lg">{next}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
