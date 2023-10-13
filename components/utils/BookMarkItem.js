import React, { useEffect, useState } from "react";

// icons
import { FiBookmark } from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";

// from next
import Link from "next/link";
import { useRouter } from "next/router";

// components
import { Btn } from "..";

// axios for data fetching
import axios from "axios";

const BookMarkItem = ({ data, bookmarks, fetchBookmarks, animated, interactive }) => {
  if(animated === undefined || animated === null) animated = true;
  if(interactive === undefined || interactive === null) interactive = true;
  const [loading, setLoading] = useState(false);

  // router of next js
  const router = useRouter();

  // check if already bookmarked
  const [isBookMarked, setIsBookMarked] = useState(false);

  // destructuring data
  const { id, resource_name, resources, resource_description } = data;

  // fetching bookmarked resources and making isBookmarked true/false
  const fetchBookmarkedResources = () => {
    if (bookmarks.some((resource) => resource.id === id)) {
      setIsBookMarked(true);
    } else {
      setIsBookMarked(false);
    }
  };

  // useEffect to handle it
  useEffect(() => {
    fetchBookmarkedResources();
  }, [bookmarks]);

  // bookmarking a resource
  const bookmarkResource = () => {
    if (typeof window !== "undefined") {
      if (isBookMarked) {
        // removing bookmark if already bookmarked
        window.localStorage.setItem(
          "bookmarks",
          JSON.stringify(bookmarks.filter((resource) => resource.id !== id))
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarkedResources();
      } else {
        // adding bookmark
        window.localStorage.setItem(
          "bookmarks",
          JSON.stringify([
            ...bookmarks,
            {
              id,
              resource_name,
              resources,
              resource_description
            },
          ])
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarkedResources();
      }
    }
  };

  // going to its own page
  const goToResourcePage = () => {
    router.push(`/post/${id}`);
  };

  return (
    <div
      className={`whitespace-normal cursor-pointer flex justify-start items-center flex-col p-5 px-4 rounded-md duration-500 white-light-shadow bg-white w-[280px] border border-[#ddd] hover:border-[#3d5eff98] item-hover-text parent-for-image-scale h-[300px] parent-for-image-scale dark:border-[#555] dark:bg-[#1F1F1F] dark:text-white ${interactive ? "pointer-events-auto" : "pointer-events-none"}`}
      onClick={goToResourcePage}
      data-aos={animated ? "fade-left" : "none"}
    >
      {loading ? (
        <div className="w-full h-full">
          <div className="relative overflow-hidden h-[157.5px] rounded-md w-full pulsate"></div>
          <div className="mt-3">
            <div className="relative overflow-hidden h-[15px] rounded-sm w-[170px] pulsate"></div>
            <div className="relative overflow-hidden h-[40px] rounded-sm w-[260px] pulsate mt-1"></div>
            <div className="relative overflow-hidden h-[10px] rounded-sm w-full pulsate mt-1"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full relative overflow-hidden h-[157.5px] rounded-md">
            <Link href={`/post/${id}`}>
              <a>
                <img
                  src={resources[0]}
                  alt={resource_name && resource_name}
                  className="rounded-md w-full mb-2 h-[157.5px] min-h-[157.5px] scale-on-hover duration-500 scale-on-hover"
                />
              </a>
            </Link>
            <Btn className="rounded-md ml-1 absolute top-1 right-1">
              <div
                className="bg-[#ffffff] p-2 text-[#F5BA31] duration-500 text-md capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover border border-transparent poppins dark:border-[#555] dark:bg-[#1F1F1F]"
                onClick={bookmarkResource}
              >
                {isBookMarked ? (
                  <BsFillBookmarkFill className="text-md span duration-500" />
                ) : (
                  <FiBookmark className="text-md span duration-500" />
                )}
              </div>
            </Btn>
          </div>
          <div className="block mt-2 w-full">
            <h1 className="font-bold text-lg duration-500 hover:text-[#3d5eff]">
              {resource_name.length > 50
                ? resource_name.slice(0, 50) + "..."
                : resource_name}
            </h1>
            <p className="text-[12px] text-[#666] mt-1 dark:text-[#aaa]">
              {resource_description
                ? resource_description.slice(0, 150)
                : "Description not found"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookMarkItem;
