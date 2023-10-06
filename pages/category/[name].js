import React, { Fragment, useEffect, useState } from "react";

// use router for params
import { useRouter } from "next/router";

// components
import {
  AppHeader,
  Banner,
  Item,
  MainHeader,
  NotFound,
} from "../../components";

// fetching data

// for inifinite scroll
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

// head
import Head from "next/head";

const name = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(6); // count of posts that should load first

  const router = useRouter();

  const { name } = router.query;

  // filters
  const [searchTerm, setSearchTerm] = useState(""); // search
  const [sort, setSort] = useState("popular"); // sort

  useEffect(async () => {
    setData([]);

    // fetching
    const allResources = await axios.get("/api/GET/resources");
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

    // data to be used
    await setData(resources);
  }, [sort, name]);

  // destructuring props
  const { user, setOpen } = props;

  // filtering posts (search)
  const filterPosts = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter((resource) => {
      return resource.category === query;
    });
  };

  // all posts gets stored here
  const filteredPosts = filterPosts(data, searchTerm);

  return (
    <Fragment>
      <Head>
        <title>
          {name && name.charAt(0).toUpperCase() + name.slice(1)} Resources -
          Coding Club
        </title>
      </Head>
      <MainHeader {...props} />
      <div className="bg-[#ECF2F5] min-h-screen p-6 dark:bg-[#2F2F2F]">
        <AppHeader
          {...props}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sort={sort}
          setSort={setSort}
        />
        <InfiniteScroll
          dataLength={count} //This is important field to render the next data
          next={() => setCount(count + 5)}
          hasMore={count >= filteredPosts.length ? false : true}
        >
          <div className="flex justify-center mt-5 w-full max-w-[100vw] overflow-hidden flex-wrap">
            {filteredPosts
              .filter((resource) => {
                const resourceName = resource.category.toLowerCase();
                return resourceName.includes(name && name.toLowerCase());
              })
              .slice(0, count)
              .map((resource, key) => (
                <Item
                  data={resource}
                  key={key}
                  {...props}
                  setOpen={setOpen}
                  user={user}
                />
              ))}
          </div>
        </InfiniteScroll>

        {data.length > 1 && filteredPosts.length < 1 && (
          <NotFound text="No Results Found" darkMode={props.darkMode} />
        )}
      </div>
    </Fragment>
  );
};

export default name;
