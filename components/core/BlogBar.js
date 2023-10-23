import React, { useEffect, useState } from "react";

// axios for data fetching
import axios from "axios";

// icons
import {
  FiAirplay,
  FiBookmark,
  FiFlag,
  FiSend,
  FiTriangle,
} from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";

// componenents
import { Comment } from "../index";

// material design
import { Button } from "@material-ui/core";

// fetching and editing db

// link
import Link from "next/link";

const BlogBar = ({currentPost}) => {
  // destructuring currentPost[0]
  let { blog_title, blog_images, blog_description, category, upvotes, addedby } = currentPost;

  return (
    <div className="w-full lg:w-[65%] xl:w-[65%] bg-white rounded-md white-light-shadow border border-[#ddd] p-7 dark:bg-[#1F1F1F] dark:border-[#555] dark:text-white">
        <img
            src={blog_images[0]}
            alt=""
            className="rounded-md w-full mb-4 max-h-[375px]"
        />
        <a
        className="font-bold text-2xl lg:text-3xl xl:text-3xl continuous-line hover:text-[#3d5eff] animate__animated animate__fadeInUp"
        href={""}
        >
            {blog_title}
        </a>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
            Description
        </h1>
        <div dangerouslySetInnerHTML={{ __html: blog_description }}></div>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
            Category
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {category}
        </p>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
            Author Name
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {addedby.displayName}
        </p>
    </div>
  );
};

export default BlogBar;
