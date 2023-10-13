import React, { useEffect, useState } from "react";

// material design
import { Button } from "@material-ui/core";

// icons
import { BsFillPlayFill, BsLightning } from "react-icons/bs";
import {
  FiBookmark,
  FiCloudLightning,
  FiDatabase,
  FiFlag,
  FiFolderPlus,
  FiGithub,
  FiLayers,
  FiMoon,
  FiPackage,
  FiPlay,
  FiRss,
  FiUsers,
} from "react-icons/fi";

// link
import Link from "next/link";

// components
import { Header } from "..";
import FeatureComponent from "../utils/FeatureComponent";

import axios from "axios"; // axios

const Hero = ({ setOpen, user, setUser }) => {
  const features = [
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Demo",
      description:
        "description",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
  ];


  return (
    <div className="min-h-screen bg-image w-full text-[#ECF2F5] overflow-visible z-10">
      <Header setOpen={setOpen} user={user} setUser={setUser} />
      <div className="flex items-center justify-center h-auto min-h-[90vh] lg:h-[90vh] xl:h-[90vh] w-full flex-col lg:flex-row xl:flex-row overflow-hidden">
        <div className="w-full lg:w-6/12 xl:w-6/12 h-auto lg:h-full xl:h-full flex items-start justify-center flex-col pl-4 lg:pl-10 xl:pl-10 relative z-10 py-4 lg:py-0 xl:py-0 overflow-hidden animate__animated animate__fadeInLeft">
          <h3 className="text-sm lg:text-base xl:text-base bg-text-gradient font-bold mb-2 uppercase tracking-wider">
            300+ Resources. Sorting. Open Source. Categories.
          </h3>
          <h1 className="font-bold text-3xl lg:text-[2.75rem] xl:text-[2.75rem] lg:leading-[3rem]">
            World biggest storehouse of developer resources
          </h1>
          <p className="text-light text-[#aaa] my-2 mt-3 text-xs lg:text-sm xl:text-sm">
            Coding Club is the all in one storehouse for developer resources.
            Coding Club is made up of 300+ curated resources from 230+ sources.
            Filter by categories, or source, sort by time or popularity, dark
            mode, bookmark resources, add new resources, request feature,
            and much more features, make the app amazing! 🤟
          </p>
          <div className="flex mt-2">
            <Link href="/app">
              <a>
                <Button className="!p-0 !w-auto !h-auto !m-auto shine">
                  <div className="bg-[#F5BA31] px-5 py-[10px] lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center">
                    Try Now!
                    <BsLightning className="text-lg ml-1 -mt-1" />
                  </div>
                </Button>
              </a>
            </Link>
          </div>
        </div>
        {/* <div className="w-full lg:w-6/12 xl:w-6/12 h-auto lg:h-full xl:h-full flex items-center justify-center flex-col relative bg-pattern-hero pb-10 lg:pb-0 xl:pb-0 animate__animated animate__fadeInRight">
          <div className="absolute h-full w-full flex items-center justify-center">
            <img
              src="/assets/icon.svg"
              className="w-[320px] lg:w-[450px] xl:w-[450px] opacity-50 lg:opacity-100 xl:opacity-100"
            />
          </div>
        </div> */}
      </div>
      {/* <div className="h-auto w-full flex items-center justify-center p-7">
        <div className="h-auto min-h-[80vh] w-full rounded-md bg-[rgba(0,0,0,0.6)] flex items-center justify-center flex-wrap border border-[#B84F90]">
          <div className="flex flex-wrap w-full justify-center mt-10">
            {features.map((feature, key) => (
              <FeatureComponent
                name={feature.name}
                description={feature.description}
                icon={feature.icon}
                key={key}
              />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
