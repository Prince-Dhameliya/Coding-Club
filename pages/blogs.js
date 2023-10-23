import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns"; // You might need to import this line if it's not already imported
import axios from "axios";
import BlogLayout from "../components/utils/BlogLayout"; // Import the BlogLayout component
import Projectitem from "../components/utils/ProjectItem";
import { Header } from "../components";
import RoundLoader from '../components/utils/RoundLoader';
import InfiniteScroll from "react-infinite-scroll-component";
import router from "next/router";
import Blog from "../components/utils/Blog";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(6); // count of posts that should load first
  const [loading, setLoading] = useState(true);

  //Fetch blogs from your API when the component mounts
  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const response = await axios.get("/api/GET/blogs"); // Adjust the endpoint
        setBlogs(response.data); // Assuming the API returns an array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  return (
    <div className="w-full h-full bg-image">
    <Header {...props} />
    <section className="py-12 px-5 sm:px-10 md:px-24 lg:px-32 flex flex-col items-center">
      <h1 className="text-white text-5xl font-bold mb-8">Blogs</h1>
      {loading 
      ? <RoundLoader />
      : <>
        <div className="text-white container mx-auto py-8">
          <InfiniteScroll
              dataLength={count} //This is important field to render the next data
              next={() => setCount(count + 5)}
              hasMore={count >= blogs.length ? false : true}
              loader={<RoundLoader />}
              >
            <div className="flex justify-center w-full flex-wrap">
              {blogs.slice(0, count).map((blog, key) => (
                <Blog
                  data={blog}
                  key={key}
                  {...props}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <Link href="/newblog">
          <a className="block">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Blog
            </button>
          </a>
        </Link>
      </>
      }
    </section>
    </div>
  );
};

export default Blogs;
