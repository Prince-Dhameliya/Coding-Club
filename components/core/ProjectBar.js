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

const ProjectBar = ({currentPost}) => {
  const [meta, setMetadata] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // text for comment
  const [text, setText] = useState("");
  // return (<div></div>);
  // destructuring currentPost[0]
  let { project_name, project_url, project_description, technologies, mentor_name, company_information, project_members } = currentPost;

  useEffect(() => {
    // normal state
    setMetadata([]);

    const fetchImage = async () => {
      // fetching state
    axios
      .get(`/api/META/parser?url=${project_url}`)
      .then(async (response) => {
        setLoading(false);
        setMetadata(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    if(project_url) fetchImage(project_url);
  }, [project_url]);


  // upvoting a cheatsheet
  // geting URL with URL API
  const url = new URL(project_url);

  // generating image for thumbnail
  const image = () => {
    if (meta.og.images.length) {
      return meta.og.images[0].url;
    } else if (meta.og.image) {
      return meta.og.image;
    } else {
      return "/assets/image-not-found.jpg"; // not found image
    }
  };
  const technology = technologies.map((obj) => obj).join(', ');
  return (
    <div className="w-full lg:w-[65%] xl:w-[65%] bg-white rounded-md white-light-shadow border border-[#ddd] p-7 dark:bg-[#1F1F1F] dark:border-[#555] dark:text-white">
      {loading ? (
        <>
          <div className="h-[325px] pulsate w-full rounded-md"></div>
          <div className="h-[10px] pulsate w-3/12 rounded-sm mt-6"></div>
          <div className="h-[40px] pulsate w-10/12 rounded-md mt-2"></div>
          <div className="h-[10px] pulsate w-full rounded-sm mt-2"></div>
          <div className="flex w-full mt-8">
            <div className="h-[40px] pulsate w-[200px] rounded-md mr-1"></div>
            <div className="h-[40px] pulsate w-[200px] rounded-md mr-1"></div>
          </div>
        </>
      ) : (
        <>
          <img
            src={meta.og && image()}
            alt=""
            className="rounded-md w-full mb-4 max-h-[375px]"
          />
          <a
            className="text-blue-500 text-base lg:text-lg xl:text-lg animate__animated animate__fadeInUp"
            href={url.protocol && url.hostname && url.protocol + url.hostname}
            target="_blank"
          >
            {url.hostname && url.hostname}
          </a>
          <br /><br />
          <a
            className="font-bold text-2xl lg:text-3xl xl:text-3xl continuous-line hover:text-[#3d5eff] animate__animated animate__fadeInUp"
            href={project_url}
          >
            {project_name}
          </a>

          <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {project_description
              ? project_description.slice(0, 250)
              : "Description not found"}
          </p>

          <br />
          <h1 className="text-lg font-bold text-[#020617] mt-3">
            Project Technologies
          </h1>
          <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {technology ? technology : "Technologies not found"}
          </p>

          <br />

          <h1 className="text-lg font-bold text-[#020617] mt-3">
            Project Member
          </h1>
          {project_members.map((member,ind) => (
            <p key={ind} className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated 
            animate__fadeInUp">Member {ind+1} Name: {member.member_name}</p>
          ))}


          <br />
          <h1 className="text-lg font-bold text-[#020617] mt-3">
            Project Mentor
          </h1>
          <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {mentor_name ? mentor_name : "Technologies not found"}
          </p>

          <br />
          {company_information ? (
            <>
              <h1 className="text-lg font-bold text-[#020617] mt-3">
                Company Information
              </h1>
              <div >
                <h3 className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp" > Company Name : {company_information.company_name}</h3>
                <h3 className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp" > Company dress : {company_information.company_address}</h3>
                <h3 className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp" > Company Contact : {company_information.company_contact}</h3>
                <h3 className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp" > Company City : {company_information.company_city}</h3>
              </div>
            </>
          ) :
            null
          }
        </>
      )}
    </div>
  );
};

export default ProjectBar;
