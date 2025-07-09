"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useSnippetContext } from "@/context/snippetContext";
import { ITag } from "@/types/types";
import { edit, plus } from "@/utils/Icons";
import React, { useEffect, useState } from "react";
import Button from "../button/button";

function AddSnippetModal() {
  const { modalMode, closeModal, activeSnippet } = useGlobalContext();
  const { createSnippet, tags, useTagColorMemo, updateSnippet } =
    useSnippetContext();

  const [activeTags, setActiveTags] = useState<ITag[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (modalMode === "edit-snippet" && activeSnippet) {
      // initialize activeTags and form fields with the activeSnippet data
      setActiveTags(activeSnippet.tags);
      setTitle(activeSnippet.title);
      setDescription(activeSnippet.description);
      setCode(activeSnippet.code);
      setLanguage(activeSnippet.language);
      setIsPublic(activeSnippet.isPublic);
    }
  }, [modalMode, activeSnippet]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setLanguage("javascript");
    setIsPublic(true);
    setActiveTags([]);
  };

  const languages = [
    "c",
    "c#",
    "c++",
    "css",
    "django",
    "go",
    "haskell",
    "html",
    "java",
    "javascript",
    "json",
    "kotlin",
    "lua",
    "php",
    "python",
    "r",
    "ruby",
    "rust",
    "sql",
    "swift",
    "typescript",
  ];

  const handleTags = (tag: ITag) => {
    const isTagActive = activeTags.some((activeTag: { _id: string }) => {
      return activeTag._id === tag._id;
    });

    if (isTagActive) {
      // remove from active tags
      setActiveTags(
        activeTags.filter((activeTag: { _id: string }) => {
          return activeTag._id !== tag._id;
        })
      );
    } else {
      // add to active tags
      setActiveTags([...activeTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const snippetData = {
      _id: activeSnippet?._id,
      title,
      description,
      code,
      language,
      isPublic,
      tags: activeTags.length > 0 ? activeTags.map((tag: ITag) => tag._id) : [],
    };

    if (modalMode === "edit-snippet") {
      updateSnippet(snippetData);

      closeModal();
    } else if (modalMode === "add-snippet") {
      const res = createSnippet(snippetData);

      if (res._id) {
        closeModal();
        resetForm();
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 z-40 h-full w-full bg-[#000]/30 backdrop-blur-sm bg-opacity-50 overflow-hidden">
      <div className="py-5 px-6 bg-[#181818] max-w-[920px] w-full flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md">
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-white text-3xl font-bold">
            {modalMode === "edit-snippet" ? (
              <span className="flex items-center gap-4">
                {edit} Edit Snippet
              </span>
            ) : (
              <span className="flex items-center gap-4">{plus}Add Snippet</span>
            )}
          </h1>

          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full h-12 px-4 bg-[#252525] text-white rounded-lg"
              />
            </div>
            <div>
              <select
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-12 px-4 bg-[#252525] text-white rounded-lg cursor-pointer"
              >
                {languages.map((lang) => {
                  return (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <select
                name="isPublic"
                value={isPublic.toString()}
                onChange={(e) => setIsPublic(e.target.value === "true")}
                className="w-full h-12 px-4 bg-[#252525] text-white rounded-lg cursor-pointer"
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
          </div>

          <div>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full pt-2 px-4 bg-[#252525] text-white rounded-lg"
              rows={2}
            ></textarea>
          </div>

          <div>
            <pre>
              <code>
                <textarea
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pt-2 h-[400px] px-4 bg-[#252525] text-white rounded-lg"
                  placeholder="// Code here..."
                ></textarea>
              </code>
            </pre>
          </div>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag: ITag) => {
              return (
                <Button
                  key={tag._id}
                  type="button"
                  className="py-1 text-white text-sm"
                  style={{
                    background: activeTags.some((activeTag: ITag) => {
                      return activeTag._id === tag._id;
                    })
                      ? "#7263f3"
                      : useTagColorMemo,
                  }}
                  onClick={() => handleTags(tag)}
                >
                  {tag.name}
                </Button>
              );
            })}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="h-[47px] flex items-center justify-center px-8 bg-red-500 text-white hover:bg-red-500/80 rounded-md transition-all duration-300 ease-in-out"
              style={{ fontWeight: 400 }}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className={`h-[47px] flex items-center justify-center py-1 px-8 ${
                modalMode === "edit" ? "bg-blue-400" : "bg-indigo-400"
              } text-white hover:bg-indigo-400/90 rounded-md transition-all duration-300 ease-in-out`}
              type="submit"
              style={{ fontWeight: 400 }}
            >
              {modalMode === "edit-snippet" ? "Update Snippet" : "Add Snippet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSnippetModal;
