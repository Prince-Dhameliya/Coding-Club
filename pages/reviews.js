import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

// for inifinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

// components
import {
  AppHeader,
  Item,
  Loader,
  MainHeader,
  NotFound,
  SvgBanner,
} from "../components";

// fetching or editing database

const Review = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(6); // count of posts that should load first
  const [loading, setLoading] = useState(false);
  
  // filters
  const [searchTerm, setSearchTerm] = useState(""); // search
  const [sort, setSort] = useState("popular"); // sort

  // destructuring props
  const { user, setOpen, darkMode, checked } = props;

  useEffect(async () => {
    setData([]);
    setLoading(true);

    // fetching
    const allResources = await axios.get("/api/GET/reviews");
    const resources = allResources.data;

    // sorting
    if (sort === "newest") {
      resources
        .sort((a, b) => {
          return a.__createdtime__ - b.__createdtime__;
        })
        .reverse();
    } else if (sort === "oldest") {
      resources.sort((a, b) => {
        return a.__createdtime__ - b.__createdtime__;
      });
    } else {
      resources.sort((a, b) => {
        if (a.upvotes.length > b.upvotes.length) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    if(checked.length > 0) {
      resources = resources.filter((resource)=> {
        return (checked.includes(resource.category)) ? true : false
      });
    }

    // data to be used
    await setData(resources);
    setLoading(false);
  }, [sort]);


  // filtering posts (search)
  const filterPosts = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter((resource) => {
      const resourceName = resource.resource_name.toLowerCase();
      return resourceName.includes(query.toLowerCase());
    });
  };

  // all posts gets stored here
  const filteredPosts = filterPosts(data, searchTerm);

  return (
    <Fragment>
      <MainHeader {...props} />
      <div className="bg-[#ECF2F5] dark:bg-[#2f2f2f] min-h-screen p-6 pb-10">
        <AppHeader
          {...props}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sort={sort}
          setSort={setSort}
        />
        <SvgBanner
          text="resource on Review"
          description="These resources are on review, give them an upvote to faster the
          process. Validation generally takes less than 2 days 🤟"
          image_url="/assets/3d/review.png"
        />
        <InfiniteScroll
          dataLength={count} //This is important field to render the next data
          next={() => setCount(count + 5)}
          hasMore={count >= data.length ? false : true}
          loader={<Loader />}
        >
          <div className="flex justify-center w-full flex-wrap">
            {filteredPosts.slice(0, count).map((resource, key) => (
              <Item
                data={resource}
                key={key}
                {...props}
                setOpen={setOpen}
                user={user}
                review={true}
                setSort={setSort}
              />
            ))}
          </div>
        </InfiniteScroll>
        {data.length > 1 && filteredPosts.length < 1 && (
          <NotFound text="No Results Found" darkMode />
        )}
        {data.length < 1 && (
          <NotFound text="No Resouces on Review" darkMode />
        )}
      </div>
    </Fragment>
  );
};

export default Review;
