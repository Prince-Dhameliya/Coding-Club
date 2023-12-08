import React, { useEffect, useState } from "react";

import Head from "next/head"; // head from next
import axios from "axios"; // axios

// components
import {
  ContributorCard,
  SvgBanner,
  MainHeader,
} from "../components";

// utils

const contributors = (props) => {
  const [webContributors, setWebContributors] = useState([]); // web
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    // fetching
    const contributors = await axios.get("/api/GET/contributors");

    // obtaining data
    setWebContributors(contributors.data);
    setLoading(false);
  }, []);

  return (
    <div className="bg-[#ECF2F5] dark:bg-[#2F2F2F] h-full w-full overflow-visible min-h-screen pb-10">
      <MainHeader {...props} />
      <Head>
        <title>Contributors - Coding Club</title>
      </Head>
      <SvgBanner
        text="Contributors"
        description="A big thanks to all contributors who helped Coding Club grow and help many! Thank you! Keep helps us grow! 🙏"
        image_url="/assets/3d/contributors.png"
      />

      <div className="flex justify-center w-full">
        <div className="w-10/12 py-2">
          <div className="w-full flex px-3 my-2 mt-3 items-center">
            <div className="w-1/12 h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
            <h3 className="mx-2 text-[#555] capitalize dark:text-[#ddd] font-bold text-lg w-auto">
              Web Contributors
            </h3>
            <div className="w-8/12 h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
          </div>
          <div className="w-full flex flex-wrap items-center justify-center">
            {webContributors.length > 0 ? (
              webContributors.map((data, key) => (
                <ContributorCard data={data} loading={loading} key={key} />
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
