import React, { useEffect, useState } from "react";

// axios for data fetching
import axios from "axios";

// icons
import {
  FiAirplay,
  FiBookmark,
  FiFlag,
  FiSend,
  FiTriangle,
} from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";

// componenents
import { Comment } from "../index";

// material design
import { Button } from "@material-ui/core";

// fetching and editing db

// link
import Link from "next/link";

const EventBar = ({currentPost}) => {
  // destructuring currentPost[0]
  let { event_name, event_url, event_description, event_venue, event_date, event_time, event_resources } = currentPost;

  return (
    <div className="w-full lg:w-[65%] xl:w-[65%] bg-white rounded-md white-light-shadow border border-[#ddd] p-7 dark:bg-[#1F1F1F] dark:border-[#555] dark:text-white">
        {/* <img
            src={meta.og && image()}
            alt=""
            className="rounded-md w-full mb-4 max-h-[375px]"
        /> */}
        <a
        className="text-blue-500 text-base lg:text-lg xl:text-lg animate__animated animate__fadeInUp"
        href={event_url}
        target="_blank"
        >
        {event_url}
        </a>
        <br /><br />
        <a
        className="font-bold text-2xl lg:text-3xl xl:text-3xl continuous-line hover:text-[#3d5eff] animate__animated animate__fadeInUp"
        href={event_url}
        >
        {event_name}
        </a>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
        Event Description
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
        {event_description
            ? event_description
            : "Description not found"}
        </p>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
        Event Vanue
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
        {event_venue ? event_venue : "Venue not found"}
        </p>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
        Event Date
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
        {event_date ? event_date : "Date not found"}
        </p>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
        Event Time
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
        {event_time ? event_time : "Time not found"}
        </p>

        <br />
        <h1 className="text-lg font-bold text-[#020617] mt-3">
        Event Required Resources
        </h1>
        <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
        {event_resources ? event_resources : "Resources not found"}
        </p>
    </div>
  );
};

export default EventBar;
