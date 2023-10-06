import React from "react";

import { FiMail } from "react-icons/fi";

// components
import { Btn } from "..";

const RightBar = ({ currentPost }) => {
  // destructuring currentPost[0]
  const { upvotes } =
    currentPost.length > 0 && currentPost[0];

  return (
    currentPost.length > 0 &&
    currentPost[0] && (
      <div className="w-full lg:w-4/12 xl:w-4/12 h-auto lg:h-[90vh] xl:h-[90vh] rounded-md white-light-shadow mx-0 lg:mx-4 xl:mx-4 sticky top-0 right-0 flex items-center justify-between flex-col">
        <div className="py-4 px-3 w-full">
          {currentPost &&
          currentPost.length > 0 &&
          currentPost[0] &&
          currentPost[0].addedby ? (
            <>
              <h1 className="text-lg font-bold text-[#ECF2F5] mt-3">
                Added By
              </h1>
              <div className="bg-[#ECF2F5] rounded-md border border-[#ddd] p-2 flex items-center hover:bg-white duration-200 dark:bg-[#1F1F1F] dark:border-[#555] animate__animated animate__fadeIn">
                {/* <img
                  src={
                    currentPost[0].addedby.photoURL
                      ? currentPost[0].addedby.photoURL
                      : `https://unavatar.vercel.app/${currentPost[0].addedby.email}`
                  }
                  alt=""
                  className="h-[50px] w-[50px] rounded-md pixelated white-light-shadow"
                /> */}
                <div className="ml-2">
                  <h2 className="font-semibold text-lg text-[#222] dark:text-[#ddd] hover:text-[#3d5eff] resource-continuous-line">
                    {currentPost[0].addedby.displayName
                      ? currentPost[0].addedby.displayName
                      : "Anonymous"}
                  </h2>
                  <div className="text-xs text-[#444] dark:text-[#aaa] flex">
                    {currentPost[0].addedby.username
                      ? currentPost[0].addedby.username
                      : "anonymous"}
                    <FiMail className="ml-1 hover:text-[#333] dark:hover:text-white" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-lg font-bold text-[#ECF2F5] mt-3">
                Added By
              </h1>
              <div className="bg-[#ECF2F5] rounded-md border border-[#ddd] p-2 flex items-center hover:bg-white duration-200 dark:bg-[#1F1F1F] dark:border-[#555] animate__animated animate__fadeIn">
                <img
                  src="https://avatars.githubusercontent.com/saviomartin"
                  alt=""
                  className="h-[50px] w-[50px] rounded-md pixelated white-light-shadow"
                />
                <div className="ml-2">
                  <h2 className="font-semibold text-lg text-[#222] dark:text-[#ddd] hover:text-[#3d5eff] resource-continuous-line">
                    Prince Dhameliya
                  </h2>
                  <div className="text-xs text-[#444] dark:text-[#aaa] flex">
                    princedhameliyar@gmail.com
                    <FiMail className="ml-1 hover:text-[#333]" />
                  </div>
                </div>
              </div>
            </>
          )}

          <h1 className="text-lg font-bold text-[#ECF2F5] mt-3">
            Upvotes ({upvotes.length})
          </h1>
          <div className="flex mt-1 flex-wrap">
            {upvotes.slice(0, 20).map((email, key) => (
              <img
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOw0fj12fxxshdFe3xGkoJ2y-RNtjm9Xl5NqmsED9-DQTqoR63Hq7L68mBrnk6uYrZWW8&usqp=CAU"}
                alt={email}
                key={key}
                className="h-[27px] w-[27px] mr-[2px] rounded-md pixelated white-light-shadow m-[2px]"
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default RightBar;
