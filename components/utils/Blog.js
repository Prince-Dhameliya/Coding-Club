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

const Blog = ({
  data,
  user,
  roles,
  ROLES,
  setOpen,
}) => {
  let [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // checking states
  const [isUpvoted, setIsUpvoted] = useState(false); // checking is already upvoted
  const [changed, setChanged] = useState(); // checking is data changed

  // destructuring data
  const { id, blog_title, blog_images, blog_description, upvotes, addedby } = data;

  // going to its own page
  const goToResourcePage = () => {
    router.push(`/blog/${id}`);
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
    if (user?.username) {
      if (isUpvoted) {
        // removing upvote if already upvoted
        const index = upvotes.indexOf(user.username);
        upvotes.splice(index, 1);

        
        fetch("/api/POST/upvote-blog", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            upvotes,
        }),
        });

        // changing visual data without fetching again
        setChanged("sub");
      } else {
        // adding upvote
        fetch("/api/POST/upvote-blog", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes: [...upvotes, user.username],
            }),
        });

        // changing visual data without fetching again
        setChanged("add");
      }
    } else {
      // showing sign in popup is user not found
      setOpen(true);
    }
  };
//   loading = true;

  return (
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
                <Link href={`/blog/${id}`}>
                <a>
                    <img src={blog_images[0]} alt="" width="300" className="rounded-md w-full mb-2 h-[157.5px] scale-on-hover duration-500" />
                </a>
                </Link>
            </div>
            <div className="block mt-2">
                <h1 className="font-bold text-black duration-500 hover:text-[#3d5eff]">
                    {blog_title?.length > 50
                    ? blog_title.slice(0, 50) + "..."
                    : blog_title}
                </h1>
                <p className="text-xs lg:text-[12px] text-[#666] dark:text-[#aaa] mt-1">
                    Publish By { addedby?.displayName
                    && addedby?.displayName}
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
                {/* <Link href={`/${review ? "review" : "post"}/${id}`}>
                <a>
                    <Btn className="rounded-md ml-1">
                    <div className="border border-[#3d5eff] text-[#3d5eff] duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins dark:border-[#555] dark:text-white">
                        {comments.length}
                        <FiMessageCircle className="text-sm ml-1 span duration-500" />
                    </div>
                    </Btn>
                </a>
                </Link> */}
            </div>
            )}
        </>
        )}
    </div>
  );
};

export default Blog;
