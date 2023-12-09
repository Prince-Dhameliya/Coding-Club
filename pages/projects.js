import React, { useEffect, useState } from "react";

// material ui
import { Button } from "@material-ui/core";

import InfiniteScroll from "react-infinite-scroll-component";

// icons
import { FiArrowRight } from "react-icons/fi";

// components
import { MainHeader, Request } from "../components";
import {
    Item,
    Loader,
    NotFound,
    SvgBanner,
    ROLES,
    roles
} from "../components";

import Link from "next/link";
import Head from "next/head";
// import styled from '@emotion/styled';
// utils

import axios from "axios";
import ProjectItem from "../components/utils/ProjectItem";

const project = (props) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(6); // count of posts that should load first
    const [loading, setLoading] = useState(false);

    // filters
    const [searchTerm, setSearchTerm] = useState(""); // search
    const [sort, setSort] = useState("popular"); // sort

    useEffect(async () => {
        setData([]);
        setLoading(true);

        // fetching
        const allProject = await axios.get("/api/GET/projectitem");
        const projectData = allProject.data;

        // sorting
        // if (sort === "newest") {
        //     projectData.sort((a, b) => {
        //             return a.__createdtime__ - b.__createdtime__;
        //         })
        //         .reverse();
        // } else if (sort === "oldest") {
        //     projectData.sort((a, b) => {
        //         return a.__createdtime__ - b.__createdtime__;
        //     });
        // } else {
        //     projectData.sort((a, b) => {
        //         if (a.upvotes.length > b.upvotes.length) {
        //             return -1;
        //         } else {
        //             return 1;
        //         }
        //     });
        // }

        // data to be used
        await setData(projectData);
        setLoading(false);
    }, [sort]);

    // destructuring props
    const { user, setOpen, darkMode } = props;

    // filtering posts (search)
    const filterPosts = (data, query) => {
        if (!query) {
            return data;
        }

        return data.filter((projects) => {
            const projectName = projects.projects_name.toLowerCase();
            return projectName.includes(query.toLowerCase());
        });
    };

    // all posts gets stored here
    const filteredPosts = filterPosts(data, searchTerm);

    return (
        <div className="bg-[#ECF2F5] dark:bg-[#2f2f2f] pb-12">
            <MainHeader {...props} />
            <Head>
                <title>Project - Coding Club</title>
            </Head>
            <div className="flex w-full items-center justify-center mt-3 mb-2 flex-col lg:flex-row">
                <img
                    src="/assets/3d/feature-requests.png"
                    className="h-[230px] lg:h-[300px]"
                />

                <div className="w-full lg:w-5/12 overflow-hidden text-center lg:text-left animate__animated animate__fadeInUp">
                    <h1 className="text-2xl lg:text-4xl font-bold dark:text-[#fafafa]">
                        Project
                    </h1>
                    <p className="text-xs lg:text-sm text-[#666] dark:text-[#ccc] mb-2 mt-1">
                        Lets make the app better together. Have a feature in mind, go ahead
                        and share add it! We're happy to implement it! ❤️
                    </p>
                    {roles?.find(role => [ROLES.Admin]?.includes(role)) && <div className="mt-8">
                        <Link href="/add-project">
                            <a>
                                <Button className="!p-0 !w-auto !h-auto !m-auto shine">
                                    <div className="bg-[#3d5eff] px-4 py-2 text-base capitalize rounded-md font-semibold flex items-center justify-center text-white hover-move-to-left">
                                        Add Project
                                        <FiArrowRight className="text-lg ml-1 span duration-500" />
                                    </div>
                                </Button>
                            </a>
                        </Link>
                    </div>}
                </div>
            </div>
        <InfiniteScroll
            dataLength={count} //This is important field to render the next data
            next={() => setCount(count + 5)}
            hasMore={count >= data.length ? false : true}
            loader={<Loader />}
            >
          <div className="flex justify-center w-full flex-wrap">
            {filteredPosts.slice(0, count).map((projects, key) => (
              <ProjectItem
                data={projects}
                key={key}
                {...props}
                setOpen={setOpen}
                user={user}
              />
            ))}
          </div>
        </InfiniteScroll>
        </div>
    )
}

export default project