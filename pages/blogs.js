import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns"; // You might need to import this line if it's not already imported
import axios from "axios";
import BlogLayout from "../components/utils/BlogLayout"; // Import the BlogLayout component

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // const BlogsData = [
  //   {
  //     id: 1,
  //     title: "Blog 1",
  //     author: "Author 1",
  //     desc: "Description of Blog 1",
  //     img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
  //     category: "Category 1",
  //     publishedAt: "2023-09-29", // Replace with the actual publication date
  //   },
  //   {
  //     id: 2,
  //     title: "Blog 1",
  //     author: "Author 2",
  //     desc: "Description of Blog 2",
  //     img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
  //     category: "Category 2",
  //     publishedAt: "2023-09-30", // Replace with the actual publication date
  //   },
  //   {
  //     id: 3,
  //     title: "Blog 3",
  //     author: "Author 3",
  //     desc: "Description of Blog 3",
  //     img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
  //     category: "Category 3",
  //     publishedAt: "2023-09-30", // Replace with the actual publication date
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "Blog 4Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3Blog 3",
  //     author: "Author 4",
  //     desc: "Description of Blog 4",
  //     img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
  //     category: "Category 4",
  //     publishedAt: "2023-09-30", // Replace with the actual publication date
  //   },
  //   {
  //     id: 4,
  //     title: "Blog 4",
  //     author: "Author 4",
  //     desc: "Description of Blog 4",
  //     img: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
  //     category: "Category 4",
  //     publishedAt: "2023-09-30", // Replace with the actual publication date
  //   },
  // ];

  // useEffect(() => {
  //   // Set the blogs state with dummy data
  //   setBlogs(BlogsData);
  // }, []);

  //Fetch blogs from your API when the component mounts
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get("/api/GET/blogs"); // Adjust the endpoint
        setBlogs(response.data); // Assuming the API returns an array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section className="bg-image py-12 px-5 sm:px-10 md:px-24 lg:px-32 flex flex-col items-center">
      <h1 className="text-white text-5xl font-bold mb-8">Blogs</h1>
      <div className="mt-4 text-white flex flex-wrap justify-left">
        {/* In Blogs.js, within the map function */}
        {blogs.map((blog) => (
          <div key={blog.id} className="sm:w-1/2 lg:w-1/3 p-4 mb-8">
            {/* Link to the slug.js page with the blog's slug as a parameter */}
            <Link href={`/slug/${blog.slug}`} passHref>
              <a>
                {/* Render the blog details */}
                <BlogLayout blog={blog} />
              </a>
            </Link>
          </div>
        ))}
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
    </section>
  );
};

export default Blogs;
