import React, { useEffect, useState } from "react";

// material ui
import { Button } from "@material-ui/core";


// icons
import { FiArrowRight } from "react-icons/fi";



import Link from "next/link";
// utils

import Head from "next/head"; // head from next
import axios from "axios"; // axios

// components
import {
    ChapterCard,
    MainHeader,
} from "../components";

// utils

const contributors = (props) => {
    const [webContributors, setWebContributors] = useState([]); // web
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        // fetching
        const contributors = await axios.get("http://localhost:3000/api/GET/cordinators");

        // obtaining data
        setWebContributors(contributors.data);
        setLoading(false);
    }, []);

    return (
        <div className="bg-[#ECF2F5] dark:bg-[#2F2F2F] h-full w-full overflow-visible min-h-screen pb-10">
            <MainHeader {...props} />
            <Head>
                <title>Team - Coding Club</title>
            </Head>


            <div className="flex justify-center w-full">
                <div className="w-10/12 py-2">
                    <div className="flex w-full items-center justify-center mt-3 mb-2 flex-col lg:flex-row">
                        <div className="w-full lg:w-5/12 overflow-hidden text-center lg:text-left animate__animated animate__fadeInUp">
                            <Link href="/add-team">
                                <a>
                                    <Button className="!p-0 !w-auto !h-auto !m-auto shine">
                                        <div className="bg-[#3d5eff] px-4 py-2 text-base capitalize rounded-md font-semibold flex items-center justify-center text-white hover-move-to-left">
                                            Add Cordinator
                                            <FiArrowRight className="text-lg ml-1 span duration-500" />
                                        </div>
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full flex px-3 my-2 mt-3 items-center">
                        <div className="w-1/12 h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
                        <h3 className="mx-2 text-[#555] capitalize dark:text-[#ddd] font-bold text-lg w-auto">
                            Our Team
                        </h3>
                        <div className="w-8/12 h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
                    </div>
                    <div className="w-full flex flex-wrap items-center justify-center">
                        {webContributors.length > 0 ? (
                            webContributors.map((data, key) => (
                                <ChapterCard data={data} loading={loading} key={key} />
                            ))
                        ) : (
                            <div className="p-5 gradient-shadow bg-white m-3 rounded-md transition cursor-pointer text-[#222] dark:bg-[#222222] dark:border-[#444] w-full lg:w-[20%] xl:w-[20%] md:w-[40%] border border-transparent hover:border-[#3d5eff98] duration-500">
                                <div className="relative overflow-hidden h-[200px] rounded-md w-full pulsate"></div>
                                <div className="mt-3">
                                    <div className="relative overflow-hidden h-[15px] rounded-sm w-[170px] pulsate"></div>
                                    <div className="relative overflow-hidden h-[40px] rounded-sm w-full pulsate mt-1"></div>
                                </div>
                                <div className="flex mt-2">
                                    <div className="relative overflow-hidden h-[15px] rounded-sm w-[120px] mr-1 pulsate mt-1"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default contributors;
