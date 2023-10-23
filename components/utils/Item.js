import React, { useEffect, useState } from "react";

// next js components
import Link from "next/link";

// components
import { Btn } from "..";
import { useRouter } from "next/router";

// icons
import {
  FiBookmark,
  FiExternalLink,
  FiMessageCircle,
  FiTriangle,
} from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FcCheckmark, FcCancel } from "react-icons/fc"

// axios for data fetching
import axios from "axios";
import toast from "react-hot-toast";

// fetching and editing data

const Item = ({
  data,
  listView,
  user,
  roles,
  ROLES,
  setOpen,
  searchTerm,
  bookmarks,
  fetchBookmarks,
  review = false,
  setSort
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // checking states
  const [isUpvoted, setIsUpvoted] = useState(false); // checking is already upvoted
  const [changed, setChanged] = useState(); // checking is data changed
  const [isBookMarked, setIsBookMarked] = useState(false); // checking is already bookmarked

  // destructuring data
  const { id, resource_name, resources, resource_description, upvotes, comments } = data;
  
  

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

  // going to its own page
  const goToResourcePage = () => {
    router.push(`/${review ? "review" : "post"}/${id}`);
  };

  // use effect for handling is upvoted or not
  useEffect(() => {
    if (upvotes) {
      if (user.username) {
        setIsUpvoted(upvotes.includes(user.username));
      }
    }
  });

  // upvoting a resource
  const upvoteResource = () => {
    if (user.username) {
      if (isUpvoted) {
        // removing upvote if already upvoted
        const index = upvotes.indexOf(user.username);
        upvotes.splice(index, 1);

        if (review) {
          fetch("/api/POST/upvote-review-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes,
            }),
          });
        } else {
          fetch("/api/POST/upvote-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes,
            }),
          });
        }

        // changing visual data without fetching again
        setChanged("sub");
      } else {
        // adding upvote
        if (review) {
          fetch("/api/POST/upvote-review-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes: [...upvotes, user.username],
            }),
          });
        } else {
          fetch("/api/POST/upvote-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes: [...upvotes, user.username],
            }),
          });
        }

        // changing visual data without fetching again
        setChanged("add");
      }
    } else {
      // showing sign in popup is user not found
      setOpen(true);
    }
  };

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

  // review the resource for admin level
  const reviewResource = async (flag) => {
    if(user.username && roles?.find(role => [ROLES.Admin]?.includes(role))) {
      const response = await fetch("/api/POST/review-resource", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          username: user.username,
          flag: flag
        }),
      });

      const {success} = await response.json();
      setSort("famous");
      // toasting success
      toast.success(success);
    }
    else {
      toast.error("UnAuthorized Action");
    }
  }

  let url = new URL(resources[0]);
  let pathExtension = url?.pathname?.substring(url?.pathname?.lastIndexOf('.')+1);

  return (
    <>
      {listView ? (
        <div
          className="cursor-pointer flex items-center p-3 rounded-md duration-500 white-light-shadow bg-white m-2 w-full lg:w-10/12 min-w-10/12 border border-[#ddd] hover:border-[#3d5eff98] item-hover-text parent-for-image-scale dark:border-[#555] dark:bg-[#1F1F1F] dark:text-white"
          onClick={goToResourcePage}
          data-aos="fade-left"
        >
          {loading ? (
            <div className="flex w-full h-full items-center">
              <div className="h-[150px] w-[400px] pulsate rounded-md"></div>
              <div className="h-[150px] w-full ml-2 py-2 flex justify-between flex-col">
                <div className="w-full">
                  <div className="pulsate rounded-sm h-[10px] w-[230px]"></div>
                  <div className="pulsate rounded-md h-[35px] mt-1 w-[400px]" />
                  <div className="pulsate rounded-sm h-[12.5px] mt-1 w-[600px]"></div>
                </div>
                <div className="flex mt-2">
                  <div className="relative overflow-hidden h-[35px] rounded-md w-[120px] mr-1 pulsate mt-1"></div>
                  <div className="relative overflow-hidden h-[35px] rounded-md w-[120px] mr-1 pulsate mt-1"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[250px] relative h-full overflow-hidden flex items-center justify-center rounded-md">
                <Link href={`/${review ? "review" : "post"}/${id}`}>
                  <a>
                    {
                      ["png", "jpeg", "jpg"].includes(pathExtension)
                      ? <img src={url} alt="" width="270" className="rounded-md w-full h-[150px] scale-on-hover duration-500" />
                      : ["mp4"].includes(pathExtension)
                      ? <img src={"./assets/images/video-icon.png"} alt="" width="270" className="rounded-md w-full h-[150px] scale-on-hover duration-500" />
                      : ["pdf"].includes(pathExtension)
                      ? <img src={"./assets/images/pdf-icon.jpg"} alt="" width="270" className="rounded-md w-full h-[150px] scale-on-hover duration-500" />
                      : null
                    }
                  </a>
                </Link>
                <Btn className="rounded-md ml-1 absolute top-1 right-1">
                  <div
                    className="bg-[#ffffff] p-2 text-[#F5BA31] duration-500 text-md capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins dark:bg-[#1F1F1F] border border-transparent dark:border-[#555]"
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
              <div className="w-9/12 h-full px-3 pl-5 py-5 flex items-start justify-between flex-col">
                <div className="block">
                    <h1 className="font-bold text-lg lg:text-xl duration-500 hover:text-[#3d5eff]">
                      {resource_name}
                    </h1>
                    <p className="text-xs lg:text-[12px] text-[#666] dark:text-[#aaa] mt-1">
                      {resource_description
                        ? resource_description.slice(0, 150)
                        : "Description not found"}
                    </p>
                </div>
                {upvotes && (
                  <div className="flex items-center justify-start mt-1 w-full">
                    <Btn className="rounded-md">
                      <div
                        className={`shine ${
                          isUpvoted
                            ? "bg-[#3d5eff] text-white"
                            : "border border-[#3d5eff] text-[#3d5eff] dark:border-[#555] dark:text-white"
                        } ${
                          changed === "add"
                            ? "bg-[#3d5eff] !text-white"
                            : "text-white"
                        } duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                        onClick={upvoteResource}
                      >
                        {changed === "add"
                          ? upvotes.length + 1
                          : changed === "sub"
                          ? upvotes.length - 0
                          : upvotes.length}
                        <FiTriangle className="text-sm ml-1 span duration-500" />
                      </div>
                    </Btn>
                    <Link href={`/${review ? "review" : "post"}/${id}`}>
                      <a>
                        <Btn className="rounded-md ml-1">
                          <div className="border border-[#3d5eff] text-[#3d5eff] duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins dark:border-[#555] dark:text-white">
                            {comments.length}
                            <FiMessageCircle className="text-sm ml-1 span duration-500" />
                          </div>
                        </Btn>
                      </a>
                    </Link>
                  </div>
                )}

                {review && roles?.find(role => [ROLES.Admin]?.includes(role)) && (
                  <>
                  <Btn className="rounded-md cursor-pointer fixed top-1 right-20">
                    <div
                      className={`shine border border-[#3d5eff] dark:border-[#555] dark:text-white text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                      onClick={() => reviewResource(true)}
                    >
                      <FcCheckmark className="text-2xl ml-1 span duration-500"/>
                    </div>
                  </Btn>

                  <Btn className="rounded-md cursor-pointer fixed top-1 right-2">
                    <div
                      className={`shine border border-[#3d5eff] dark:border-[#555] dark:text-white text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                      onClick={() => reviewResource(false)}
                    >
                      <FcCancel className="text-2xl ml-1 span duration-500"/>
                    </div>
                  </Btn>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className="cursor-pointer flex justify-between flex-col p-5 rounded-md duration-500 white-light-shadow bg-white m-2 w-full lg:w-3/12 xl:w-[20%] border border-[#ddd] hover:border-[#3d5eff98] item-hover-text parent-for-image-scale dark:border-[#555] dark:bg-[#1F1F1F] dark:text-white"
          onClick={goToResourcePage}
          data-aos="fade-left"
        >
          {loading ? (
            <>
              <div className="relative overflow-hidden h-[157.5px] rounded-md w-full pulsate"></div>
              <div className="mt-3">
                <div className="relative overflow-hidden h-[15px] rounded-sm w-[170px] pulsate"></div>
                <div className="relative overflow-hidden h-[40px] rounded-sm w-[260px] pulsate mt-1"></div>
                <div className="relative overflow-hidden h-[10px] rounded-sm w-[260px] pulsate mt-1"></div>
              </div>
              <div className="flex mt-2">
                <div className="relative overflow-hidden h-[35px] rounded-sm w-[120px] mr-1 pulsate mt-1"></div>
                <div className="relative overflow-hidden h-[35px] rounded-sm w-[120px] mr-1 pulsate mt-1"></div>
              </div>
            </>
          ) : (
            <>
              <div className="block">
                <div className="w-full relative overflow-hidden h-[157.5px] rounded-md">
                  <Link href={`/${review ? "review" : "post"}/${id}`}>
                    <a>
                      {
                        ["png", "jpeg", "jpg"].includes(pathExtension)
                        ? <img src={url} alt="" width="300" className="rounded-md w-full mb-2 h-[157.5px] scale-on-hover duration-500" />
                        : ["mp4"].includes(pathExtension)
                        ? <img src={"./assets/images/video-icon.png"} alt="" width="300" className="rounded-md w-full mb-2 h-[157.5px] scale-on-hover duration-500" />
                        : ["pdf"].includes(pathExtension)
                        ? <img src={"./assets/images/pdf-icon.jpg"} alt="" width="300" className="rounded-md w-full mb-2 h-[157.5px] scale-on-hover duration-500" />
                        : null
                      }
                    </a>
                  </Link>
                  <Btn className="rounded-md ml-1 absolute top-1 right-1">
                    <div
                      className="bg-[#ffffff] dark:bg-[#1F1F1F] border border-transparent dark:border-[#555] p-2 text-[#F5BA31] duration-500 text-md capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins"
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
                <div className="block mt-2">
                    <h1 className="font-bold text-lg duration-500 hover:text-[#3d5eff]">
                      {resource_name.length > 50
                        ? resource_name.slice(0, 50) + "..."
                        : resource_name}
                    </h1>
                    <p className="text-xs lg:text-[12px] text-[#666] dark:text-[#aaa] mt-1">
                      {resource_description
                        ? resource_description.slice(0, 150)
                        : "Description not found"}
                    </p>
                </div>
              </div>
              {upvotes && (
                <div className="flex items-center justify-start mt-1 w-full">
                  <Btn className="rounded-md">
                    <div
                      className={`shine ${
                        isUpvoted
                          ? "bg-[#3d5eff] text-white"
                          : "border border-[#3d5eff] text-[#3d5eff] dark:border-[#555] dark:text-white"
                      } ${
                        changed === "add"
                          ? "bg-[#3d5eff] !text-white"
                          : "text-white"
                      } duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                      onClick={upvoteResource}
                    >
                      {changed === "add"
                        ? upvotes.length + 1
                        : changed === "sub"
                        ? upvotes.length - 0
                        : upvotes.length}
                      <FiTriangle className="text-sm ml-1 span duration-500" />
                    </div>
                  </Btn>
                  <Link href={`/${review ? "review" : "post"}/${id}`}>
                    <a>
                      <Btn className="rounded-md ml-1">
                        <div className="border border-[#3d5eff] text-[#3d5eff] duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins dark:border-[#555] dark:text-white">
                          {comments.length}
                          <FiMessageCircle className="text-sm ml-1 span duration-500" />
                        </div>
                      </Btn>
                    </a>
                  </Link>
                </div>
              )}

              {review && roles?.find(role => [ROLES.Admin]?.includes(role)) && (
                  <>
                  <Btn className="rounded-md cursor-pointer fixed bottom-1 right-20">
                    <div
                      className={`shine border border-[#3d5eff] dark:border-[#555] dark:text-white text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                      onClick={() => reviewResource(true)}
                    >
                      <FcCheckmark className="text-2xl ml-1 span duration-500"/>
                    </div>
                  </Btn>

                  <Btn className="rounded-md cursor-pointer fixed bottom-1 right-2">
                    <div
                      className={`shine border border-[#3d5eff] dark:border-[#555] dark:text-white text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins`}
                      onClick={() => reviewResource(false)}
                    >
                      <FcCancel className="text-2xl ml-1 span duration-500"/>
                    </div>
                  </Btn>
                  </>
                )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Item;
