import React, { useEffect, useState } from "react";

// router from next
import { useRouter } from "next/router";

// components
import { RightBar, InfoBar, Header } from "../../components";

// head
import Head from "next/head";
import axios from "axios";

const Resource = (props) => {
  const router = useRouter(); // router

  const [data, setData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(1);

  // getting the id
  const { id } = router.query;

  const filterPosts = (data, id) => {
    if (!id) {
      return data;
    }

    return data.filter((resource) => {
      const resourceId = resource.id;
      return resourceId.includes(id);
    });
  };

  useEffect(async () => {
    const allResources = await axios.get("/api/GET/resources");
    const resources = allResources.data;

    setData(resources);
  }, [fetchAgain]);

  // gets the currentPost
  const currentPost = filterPosts(data, id); // 🤟

  return (
    <div className="bg-image">
      <Head>
        <title>
          {currentPost[0] && currentPost[0].resource_name} - Coding Club
        </title>
      </Head>
      <Header {...props} />
      <div className="h-full min-h-screen p-6 flex items-start justify-start relative flex-col lg:flex-row xl:flex-row">
        {currentPost[0] && (<InfoBar
          currentPost={currentPost}
          {...props}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />)}
        <RightBar currentPost={currentPost} {...props} />
      </div>
    </div>
  );
};

export default Resource;
