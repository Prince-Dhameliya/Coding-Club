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

//Pdf Viewer
import Iframe from 'react-iframe';

const InfoBar = ({
  currentPost,
  bookmarks,
  fetchBookmarks,
  user,
  setOpen,
  fetchAgain,
  setFetchAgain,
  review = false,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // checking states
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);

  // text for comment
  const [text, setText] = useState("");

  // destructuring currentPost[0]
  let { id, resource_name, resources, resource_description, upvotes, comments } = currentPost[0];

  // fetching bookmarked resources and check if already bookmarked or not
  const fetchBookmarkedResources = () => {
    let bookmarked = false;
    for(let bookmark of bookmarks) {
      if(bookmark.id === id){
        bookmarked = true;
      }
    }
    setIsBookMarked(bookmarked);
  };

  // use effect to handle it
  useEffect(() => {
    if(currentPost.length > 0) {
        id = currentPost[0].id;
        resource_name = currentPost[0].resource_name;
        resources = currentPost[0].resources;
        resource_description = currentPost[0].resource_description;
        upvotes = currentPost[0].upvotes;
        comments = currentPost[0].comments;
    }
    return fetchBookmarkedResources();
  }, [bookmarks, currentPost]);

  // use effect for handling is upvoted or not
  useEffect(() => {
    if (upvotes) {
      if (user.username) {
        setIsUpvoted(upvotes.includes(user.username));
      }
    }
  });

  // upvoting a resource
  const upvoteResource = () => {
    if (user.username) {
      if (isUpvoted) {
        // removing upvote if already upvoted
        const index = upvotes.indexOf(user.username);
        upvotes.splice(index, 1);

        if (review) {
          fetch("/api/POST/upvote-review-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes,
            }),
          });
        } else {
          fetch("/api/POST/upvote-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes,
            }),
          });
        }

        // fetch date again with new content
        setFetchAgain(fetchAgain + 1);
      } else {
        if (review) {
          fetch("/api/POST/upvote-review-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes: [...upvotes, user.username],
            }),
          });
        } else {
          fetch("/api/POST/upvote-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              upvotes: [...upvotes, user.username],
            }),
          });
        }

        // fetch date again with new content
        setFetchAgain(fetchAgain + 1);
      }
    } else {
      // showing sign in popup is user not found
      setOpen(true);
    }
  };

  // bookmarking a resource
  const bookmarkResource = () => {
    if (typeof window !== "undefined") {
      if (isBookMarked) {
        // removing bookmark
        window.localStorage.setItem(
          "bookmarks",
          JSON.stringify(bookmarks.filter((resource) => resource.id !== id))
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarkedResources();
      } else {
        // adding bookmark
        window.localStorage.setItem(
          "bookmarks",
          JSON.stringify([
            ...bookmarks,
            {
              id,
              resource_name,
              resources,
              resource_description
            },
          ])
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarkedResources();
      }
    }
  };

  // send comment
  const sendComment = () => {
    if (user.username) {
      if (text.replace(/\s/g, "") === "") {
        console.log("type something..."); // checking if any text is there
      } else {
        // adding comment
        if (review) {
          fetch("/api/POST/comment-review-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              comments: [
                ...comments,
                {
                  name: user.displayName ? user.displayName : "",
                  // photoURL: user?.photoURL ? user?.photoURL : "",
                  comment: text,
                  username: user.username,
                  time: new Date().getTime(),
                },
              ],
            }),
          });
        } else {
          fetch("/api/POST/comment-resource", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              comments: [
                ...comments,
                {
                  name: user.displayName ? user.displayName : "",
                  // photoURL: user.photoURL ? user.photoURL : "",
                  comment: text,
                  username: user.username,
                  time: new Date().getTime(),
                },
              ],
            }),
          });
        }
      }

      // fetch date again with new content
      setFetchAgain(fetchAgain + 1);

      // normal state
      setText("");
    } else {
      // showing sign in popup is user not found
      setOpen(true);
    }
  };

  let url = new URL(resources[0]);
  let pathExtension = url?.pathname?.substring(url?.pathname?.lastIndexOf('.')+1);

  return (
    <div className="w-full lg:w-[65%] xl:w-[65%] h-full min-h-[90vh] bg-white rounded-md white-light-shadow border border-[#ddd] p-7 dark:bg-[#1F1F1F] dark:border-[#555] dark:text-white">
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
          {/* Multiple resources section */}
          <div className="rounded-md w-full mb-4 max-h-[375px]">
              {/* {console.log(pathExtension)} */}
            {
              ["png", "jpeg", "jpg"].includes(pathExtension)
              ? <img className="rounded-md w-full mb-4 max-h-[375px]" src={url} alt="" />
              : ["mp4"].includes(pathExtension)
              ? <video className="" muted loop controls><source src={url} type="video/mp4"/></video>
              : ["pdf"].includes(pathExtension)
              ? <Iframe
                  className="w-full"
                  url={url}
                  id="pdf-iframe"
                />
              : null
            }
          </div>
          
          <p className="font-bold text-2xl lg:text-3xl xl:text-3xl continuous-line hover:text-[#3d5eff] animate__animated animate__fadeInUp">
            {resource_name}
          </p>
          <p className="text-[#666] mt-1 dark:text-[#aaa] text-sm lg:text-base animate__animated animate__fadeInUp">
            {resource_description
              ? resource_description.slice(0, 150)
              : "Description not found"}
          </p>
          <div className="flex mt-4 h-full items-start justify-between animate__animated animate__fadeInUp">
            <div className="flex">
              <Button className="!p-0 !w-auto !h-auto !m-0">
                <div
                  className={`${
                    isUpvoted
                      ? "bg-[#3d5eff] text-white shine"
                      : "border border-[#3d5eff] text-[#3d5eff] duration-500 hover:bg-[#3d5eff] hover:text-white dark:border-[#777] dark:text-[#ddd] dark:bg-[#2f2f2f]"
                  } px-3 lg:px-5 xl:px-5 py-[8px] text-md lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover`}
                  onClick={upvoteResource}
                >
                  {upvotes && upvotes.length} Upvotes
                  <FiTriangle className="text-lg ml-1 -mt-1 span" />
                </div>
              </Button>
              {/* <Button
                className="!p-0 !w-auto !h-auto !m-0 !ml-1"
                href={website_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="border border-[#3d5eff] text-[#3d5eff] hover:bg-[#3d5eff] duration-500 hover:text-white px-3 lg:px-5 xl:px-5 py-[8px] text-md lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover dark:border-[#777] dark:text-[#ddd] dark:bg-[#2f2f2f]">
                  Visit Website
                  <FiAirplay className="text-lg ml-1 span !duration-500" />
                </div>
              </Button> */}
              <div
                className="p-2 py-3 text-[#F5BA31] duration-500 text-xl capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins cursor-pointer"
                onClick={bookmarkResource}
              >
                {isBookMarked ? (
                  <BsFillBookmarkFill className="text-md span duration-500" />
                ) : (
                  <FiBookmark className="text-md span duration-500" />
                )}
              </div>
            </div>
            {!review && (
              <Link
                href={`/report-post?id=${id}&resource_name=${resource_name}`}
              >
                <a>
                  <Button className="!p-0 !w-auto !h-auto !m-0 !ml-1 !hidden lg:!block">
                    <div className="duration-500 px-3 lg:px-5 xl:px-5 py-[8px] text-md lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover border dark:border-[#777] dark:text-[#ddd] text-[#3d5eff] bg-[#eee] dark:bg-[#2f2f2f] border-[#ddd]">
                      Report
                      <FiFlag className="text-lg ml-1 span !duration-500" />
                    </div>
                  </Button>
                </a>
              </Link>
            )}
          </div>
          <div className="w-full bg-[#ddd] h-[1.25px] my-4 rounded-md dark:bg-[#555]"></div>

          <h1 className="font-semibold text-lg lg:text-xl xl:text-xl text-[#555] dark:text-[#ccc]">
            Comments ({comments && comments.length})
          </h1>

          <div className="flex border border-[#3d5eff] hover:border-[#445ac5] duration-500 focus:border-[#3d5eff] pl-3 rounded-lg p-1 w-full items-center justify-between my-2">
            <input
              type="text"
              placeholder="Add Your Comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  sendComment();
                }
              }}
              className="h-full py-1 pl-1 w-full bg-transparent"
            />
            <div
              className="bg-[#3d5eff] p-3 pr-4 cursor-pointer shine rounded-lg"
              onClick={sendComment}
            >
              <FiSend
                className="text-white"
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
          </div>

          {comments &&
            comments.map((comment, index) => (
              <Comment key={index} id={id} index={index} user={user} comments={comments} comment={comment} review={review} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpen={setOpen}/>
            ))}
        </>
      )}
    </div>
  );
};

export default InfoBar;
