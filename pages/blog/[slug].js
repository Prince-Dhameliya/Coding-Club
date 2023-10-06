// pages/slug.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const fetchBlogData = async (slug) => {
  try {
    if (slug) {
      // Example: Fetch the blog data by slug from an API
      const response = await fetch(`/api/GET/blogs/${slug}`);
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
    throw error;
  }
};

const SingleBlog = () => {
  const router = useRouter();
  const { slug } = router.query; // Retrieve the slug from the URL

  const [blog, setBlog] = useState(null);

  //useEffect(() => {
    // Fetch the blog data using the slug or ID
    // You can use an API request or load it from your data source
    // Replace this with your actual data fetching logic
    //if (slug) {
      // Example: Fetch the blog data by slug from an API
      // const response = await fetch(`/api/blog/${slug}`);
      // const data = await response.json();
      // setBlog(data);

      // For now, use dummy data
      // const dummyBlog = {
      //   id: 1,
      //   title: "Blog 1",
      //   author: "Author 1",
      //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      //   img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
      //   category: "Category 1",
      //   publishedAt: "2023-09-29", // Replace with the actual publication date
      // };
      // setBlog(dummyBlog);
  //   }
  // }, [slug]);

  useEffect(() => {
    // Call the async function to fetch blog data
    const fetchData = async () => {
      try {
        const data = await fetchBlogData(slug);
        setBlog(data);
      } catch (error) {
        // Handle the error here
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, [slug]);

  if (!blog) {
    // You can add a loading state here if needed
    return <div className="bg-image py-12 px-5 sm:px-10 md:px-24 lg:px-32 group flex flex-col items-left text-white text-dark dark:text-light">Loading...</div>;
  }

  return (
    <div className="bg-image py-12 px-5 sm:px-10 md:px-24 lg:px-32 group flex flex-col items-left text-white text-dark dark:text-light">
      <h1 className="text-5xl font-bold mb-8">Blog</h1>
      <Link
        href={`/blog/${blog.id}`}
        className="h-full rounded-xl overflow-hidden"
      >
        <img
          src={blog.img}
          alt={blog.title}
          className="h-auto max-w-xs rounded-lg"
        />
      </Link>

      <div className="flex flex-col w-full mt-2">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog.category}
        </span>
        <Link href={`/blog/${blog.id}`} className="inline-block my-1">
          <h2 className="mt-3 font-semibold capitalize text-base sm:text-lg">
            <span className="text-4xl bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>
        <Link href={`/blog/${blog.id}`} className="inline-block my-1">
          <h2 className="mt-4 font-semibold capitalize text-base sm:text-lg">
            <span className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.desc}
            </span>
          </h2>
        </Link>

        {/* <span className="mt-3 capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span> */}
      </div>
      <div className="mt-8">
        <Link href="/newblog">
          <a className="block">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Post
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SingleBlog;
