import axios from "axios";
import React, { useEffect, useState } from "react";

// for inifinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

// components
import { AppHeader, Btn, Item } from "..";

import Loader from "../utils/Loader";
import NotFound from "../utils/NotFound";

const App = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(18); // count of posts that should load first
  const [loading, setLoading] = useState(false);

  // filters
  const [searchTerm, setSearchTerm] = useState(""); // search
  const [sort, setSort] = useState("popular"); // sort

  // destructuring props
  const { showLoadingButton = false, user, setOpen, checked} = props;

  useEffect(async () => {
    setData([]);
    setLoading(true);

    // fetching
    const resources = await axios.get("/api/GET/resources");

    // sorting
    if (sort === "newest") {
      resources.data
        .sort((a, b) => {
          return a.__createdtime__ - b.__createdtime__;
        })
        .reverse();
    } else if (sort === "oldest") {
      resources.data.sort((a, b) => {
        return a.__createdtime__ - b.__createdtime__;
      });
    } else {
      resources.data.sort((a, b) => {
        if (a.upvotes.length > b.upvotes.length) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    
    if(checked.length > 0) {
      resources.data = resources.data.filter((resource)=> {
        return (checked.includes(resource.category)) ? true : false
      });
    }

    // data to be used
    await setData(resources.data);
    setLoading(false);
  }, [sort, checked.length]);
  
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
    <div className="bg-[#ECF2F5] dark:bg-[#2F2F2F] min-h-screen p-6">
      <AppHeader
        {...props}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
      />
      {showLoadingButton ? (
        <>
          <div className="flex justify-center mt-5 w-full flex-wrap">
            {filteredPosts
              .slice(0, searchTerm ? 25 : count)
              .map((resource, key) => (
                <Item
                  data={resource}
                  key={key}
                  {...props}
                  setOpen={setOpen}
                  searchTerm={searchTerm}
                  user={user}
                />
              ))}
          </div>
          {loading ? (
            
            <Loader />
          ) : (
            !searchTerm && (count > 20) && (
              <div className="w-full flex item-center justify-center mt-8">
                <Btn>
                  <button
                    className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                    onClick={() => setCount(count + 20)}
                  >
                    Load More ...
                  </button>
                </Btn>
              </div>
            )
          )}
        </>
      ) : (
        <InfiniteScroll
          dataLength={count} //This is important field to render the next data
          next={() => setCount(count + 5)}
          hasMore={count >= data.length ? false : true}
          loader={<Loader />}
        >
          <div className="flex justify-center mt-5 w-full flex-wrap">
            {filteredPosts.slice(0, count).map((resource, key) => (
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
      )}
      {data.length > 1 && filteredPosts.length < 1 && (
        <NotFound text="No Results Found" darkMode={props.darkMode} />
      )}
    </div>
  );
};

export default App;
