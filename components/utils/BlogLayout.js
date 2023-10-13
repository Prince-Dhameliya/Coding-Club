import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const BlogLayout = ({ blog }) => {
  return (
    <div className="group flex flex-col text-dark dark:text-light">
      <Link href={`/blog/${blog.id}`} className="h-full rounded-xl overflow-hidden">
        <img src={blog.img} alt={blog.title} className="h-auto max-w-xs rounded-lg" />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog.category}
        </span>
        <Link href={`/blog/${blog.id}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>

        {/* <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base">
          {format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}
        </span> */}
      </div>
    </div>
  );
};

export default BlogLayout;
