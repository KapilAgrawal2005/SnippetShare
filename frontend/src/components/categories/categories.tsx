"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUserContext } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { useSnippetContext } from "@/context/snippetContext";
import { ITag } from "@/types/types";

const Categories = () => {
  const {
    tags,
    getPublicSnippets,
    getUserSnippets,
    getLikedSnippets,
    getPopularSnippets,
  } = useSnippetContext();

  const userId = useUserContext().user?._id;

  const [activeTag, setActiveTag] = React.useState("All");
  const [activeTagId, setActiveTagId] = React.useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    // if a tag is seleted then filter snippets by tag
    const fetchData = async () => {
      if (activeTagId) {
        switch (pathname) {
          case "/":
            await getPublicSnippets("", activeTagId);
            break;
          case "/mysnippets":
            await getUserSnippets(activeTagId);
            break;
          case "/favourites":
            await getLikedSnippets(activeTagId);
            break;
          case "/popular":
            await getPopularSnippets(activeTagId);
            break;
          default:
            break;
        }
      } else {
        // if no tag is selected then fetch all snippets based on current page
        switch (pathname) {
          case "/":
            await getPublicSnippets();
            break;
          case "/mysnippets":
            await getUserSnippets();
            break;
          case "/favourites":
            await getLikedSnippets();
            break;
          case "/popular":
            await getPopularSnippets();
            break;
          default:
            await getPublicSnippets();
            break;
        }
      }
    };
    fetchData();
  }, [
    pathname,
    userId,
    activeTagId,
    getLikedSnippets,
    getPopularSnippets,
    getPublicSnippets,
    getUserSnippets,
  ]);

  return (
    <div className="fixed w-full z-10 mt-3">
      <div className="pl-14 pr-[14rem] py-5  bg-[#181818] border-b-2 border-[#212121]">
        <Carousel className="w-full lg:max-w-[1200px] xl:max-w-[1450px]">
          <CarouselContent className="flex gap-4">
            <CarouselItem
              className={`relative text-white text-sm flex items-centercursor-pointer px-6 py-1 rounded-full border-[0.1rem] border-[#ffffff33] select-none ${
                activeTag === "All"
                  ? "bg-[#7263F3] "
                  : "bg-[#3A3B3C] hover:text-gray-800 hover:bg-white transition-all duration-300 ease-in-out"
              }`}
              onClick={() => {
                setActiveTag("All");
                setActiveTagId(null);
              }}
            >
              All
            </CarouselItem>
            {tags.map((tag: ITag) => {
              return (
                <CarouselItem
                  key={tag._id}
                  className={`relative text-white text-sm flex items-center cursor-pointer px-6 py-1 rounded-full border-[0.1rem] border-[#ffffff33] select-none ${
                    activeTag === tag.name
                      ? "bg-[#7263F3] "
                      : "bg-[#3A3B3C] hover:text-gray-800 hover:bg-white transition-all duration-300 ease-in-out"
                  }`}
                  onClick={() => {
                    setActiveTag(tag.name);
                    setActiveTagId(tag._id);
                  }}
                >
                  {tag.name.toUpperCase()}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
