import React from "react";

// icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const ChapterCard = ({ data, loading }) => {
  // console.log(data);
  return (
    <div
      className="p-5 gradient-shadow bg-white m-3 rounded-md transition duration-400 cursor-pointer text-[#222] dark:bg-[#222222] border dark:border-[#444] w-full lg:w-[25%] xl:w-[25%] md:w-[25%] border-transparent hover:border-[#3d5eff98] duration-500"
      data-aos="fade-left"
    >
      {loading ? (
        <>
          <div className="relative overflow-hidden h-[200px] rounded-md w-full pulsate"></div>
          <div className="mt-3">
            <div className="relative overflow-hidden h-[15px] rounded-sm w-[170px] pulsate"></div>
            <div className="relative overflow-hidden h-[40px] rounded-sm w-full pulsate mt-1"></div>
          </div>
          <div className="flex mt-2">
            <div className="relative overflow-hidden h-[15px] rounded-sm w-[120px] mr-1 pulsate mt-1"></div>
          </div>
        </>
      ) : (
        <>
          <img
            src={
              data.resources
                ? data.resources
                : null
            }
            alt={data.cordinator_name && data.cordinator_name}
            className="max-h-[200px] rounded-md w-full"
          />
          <h1 className="text-2xl text-center font-bold Raleway mt-2 truncate capitalize dark:text-[#fafafa] -mb-2">
            {data.cordinator_name && data.cordinator_name}
          </h1>

          <h3 className="text-1xl text-center Raleway mt-5 truncate capitalize dark:text-[#fafafa] -mb-2">
            {data.chapter && data.chapter}
          </h3>
          
          <div className="flex items-center justify-center mt-5">
            <div className="flex items-center pt-4 mr-7 h-15">
              <Tooltip title={data.cordinator_email} className="hover:text-red-500" TransitionComponent={Zoom}>
                <Link
                  href={`mailto:${data.cordinator_email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-[#ddd] hover:text-[#999] dark:hover:text-[#ccc]"
                >
                  <MailOutlineIcon />
                </Link>
              </Tooltip>
            </div>
            <div className="flex items-center pt-4 mr-7 h-15">
              <Tooltip title={data.cordinator_linkedin} className="hover:text-red-500">
                <Link
                  href={`https://${data.cordinator_linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-[#ddd] hover:text-[#999] dark:hover:text-[#ccc]"
                >
                  <LinkedInIcon />
                </Link>
              </Tooltip>
            </div>
            <div className="flex items-center pt-4 mr-7 h-15">
              <Tooltip title={data.cordinator_github} className="hover:text-red-500">
                <Link
                  href={`https://${data.cordinator_github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-[#ddd] hover:text-[#999] dark:hover:text-[#ccc]"
                >
                  <GitHubIcon />
                </Link>
              </Tooltip>
            </div>
            <div className="flex items-center pt-4 mr-7 h-15">
              <Tooltip title={data.cordinator_contact} className="hover:text-red-500">
                <Link
                  href={`tel:${data.cordinator_contact}`}
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-[#ddd] hover:text-[#999] dark:hover:text-[#ccc]"
                >
                  <LocalPhoneIcon />
                </Link>
              </Tooltip>
            </div>
          </div>
          </>
      )}
    </div>
  );
};

export default ChapterCard;
