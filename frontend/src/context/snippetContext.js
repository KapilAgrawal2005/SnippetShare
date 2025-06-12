"use client";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const serverUrl = "http://localhost:4000/api/v1";

  const [publicSnippets, setPublicSnippets] = useState([]);

  const getPublicSnippets = async (userId, tagId, searchQuery, page) => {
    try {
      const queryParams = new URLSearchParams();

      if (userId) {
        queryParams.append("userId", userId);
      }

      if (tagId) {
        queryParams.append("tagId", tagId);
      }

      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      if (page) {
        queryParams.append("page", page);
      }

      const res = await axios.get(
        `${serverUrl}/snippets/public?${queryParams.toString()}`
      );

      if (res.data && res.data.snippets) {
        setPublicSnippets(res.data.snippets);
        return res.data.snippets;
      } else {
        console.log("No public snippets found");
        return res.data.snippets;
      }
    } catch (error) {
      console.log("Error fetching public snippets", error);
      return [];
    }
  };

  const gradients = {
    buttonGradient1:
      "linear-gradient(110.42deg, rgba(107, 190, 146, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
    buttonGradient2:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient3:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient4:
      "linear-gradient(110.42deg, rgba(168, 85, 247, 0.1) 29.2%, rgba(245, 102, 146, 0.1) 63.56%)",
    buttonGradient5:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient6:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient7:
      "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
    buttonGradient8:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient9:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
    buttonGradient10:
      "linear-gradient(110.42deg, rgba(235, 87, 87, 0.1) 29.2%, rgba(189, 68, 166, 0.1) 53.82%, rgba(247, 85, 143, 0.1) 63.56%)",
    buttonGradient11:
      "linear-gradient(110.42deg, rgba(25, 151, 222, 0.1) 29.2%, rgba(168, 85, 247, 0.1) 63.56%)",
    buttonGradient12:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(247, 104, 85, 0.1) 63.56%)",
    buttonGradient13:
      "linear-gradient(110.42deg, rgba(226, 195, 33, 0.1) 29.2%, rgba(99, 3, 255, 0.1) 63.56%)",
    buttonGradient14:
      "linear-gradient(110.42deg, rgba(41, 25, 222, 0.1) 29.2%, rgba(235, 87, 87, 0.1) 63.56%)",
  };

  const randomButtonColor =
    Object.values(gradients)[
      Math.floor(Math.random() * Object.values(gradients).length)
    ];

  const randomTagColor =
    Object.values(gradients)[
      Math.floor(Math.random() * Object.values(gradients).length)
    ];

  const useBtnColorMemo = useMemo(() => randomButtonColor, []);
  const useTagColorMemo = useMemo(() => randomTagColor, []);

  useEffect(() => {
    getPublicSnippets();
    // getTags();
    // getLeaderboard();
    // getPopularSnippets();
  }, []);

  return (
    <SnippetContext.Provider
      value={{
        publicSnippets,
        getPublicSnippets,
        useBtnColorMemo,
        useTagColorMemo,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
export function useSnippetContext() {
  return useContext(SnippetContext);
}
