import React, { useState } from "react";
import { useRouter } from "next/router";

// material design
import { Button } from "@material-ui/core";

// link from next
import Link from "next/link";

// icons
import { FiMenu } from "react-icons/fi";

// menu from material ui
import Menu from "@material-ui/core/Menu";

// auth for signin out
// import { auth } from "../../utils/firebaseConfig";

// components
import { Btn } from "..";
import UserImage from "../../styles/pngegg.png"

// toast
import toast from "react-hot-toast";

const Header = ({ user, setUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNav, setShowNav] = useState(false);

  //Redirect
  const { push } = useRouter();

  // sign out function
  const signOut = () => {
    window.localStorage.removeItem("profile");
    setUser({});
    toast.success("Signed Out from Coding Club!");

    // normalize
    setAnchorEl(null);
  };

  return (
    <div className="w-full px-4 py-3 glassmorphism flex justify-between items-center flex-col lg:flex-row xl:flex-row">
      <Link href="/">
        <a className="text-3xl font-extrabold text-[#ECF2F5] change-span-color-onhover">
          Coding Club
          <span className="text-[#ffcf5e] text-5xl duration-500 leading-3">
            .
          </span>
        </a>
      </Link>
      <div className="flex h-full items-center">
        <div className="hidden md:flex lg:flex xl:flex">
          {/* <Link href="/feature-requests">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Feature Requests
            </a>
          </Link> */}
          <Link href="/blogs">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Blogs
            </a>
          </Link>
          <Link href="/events">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Events
            </a>
          </Link>
          <Link href="/projects">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Projects
            </a>
          </Link>
          <Link href="/contributors">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Contributors
            </a>
          </Link>
          <Link href="/team">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Our Team
            </a>
          </Link>
          <Link href="/reviews">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              On Review
            </a>
          </Link>
          <Link href="/collections">   
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Collections
            </a>
          </Link>
          <Link href="/bookmarks">
            <a className="text-[13.75px] font-medium ml-[18px] continuous-line text-white">
              Bookmarks
            </a>
          </Link>
        </div>
        <Btn className="rounded-md block lg:hidden md:hidden xl:hidden">
          <div
            className={`bg-app-gradient-2 dark:text-white duration-500 px-3 py-[10px] text-lg capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover menu-toggle ${
              showNav && "menu-toggle-active"
            }`}
            onClick={() => setShowNav(!showNav)}
          >
            <span></span>
          </div>
        </Btn>

        <Link href="/new">
          <a>
            <Button className="!p-0 !w-auto !h-auto !m-auto shine !ml-2 lg:!ml-[18px] xl:!ml-[18px] !hidden lg:!block xl:!block md:!block">
              <div className="border-2 border-[#ffcf5e] text-[#ffcf5e] px-2 py-[4px] text-md capitalize rounded-md font-semibold flex items-center justify-center">
                New Resource
              </div>
            </Button>
          </a>
        </Link>
        {user.username ? (
          <>
            <Button
              className="!p-0 !w-auto !h-auto !m-auto !ml-2"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <div className="bg-[#F5BA31] p-[6px] pr-[8px] text-md capitalize rounded-md font-semibold flex items-center justify-center">
                {/* <img
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_aEJ45XYA3nrLCzO2XbpTCipQPzzuebn1cQ&usqp=CAU`
                  }
                  alt=""
                  className="h-7 w-7 rounded-md mr-1"
                /> */}
                {user.displayName ? user.displayName : "User"}
              </div>
            </Button>
            <Menu
              getContentAnchorEl={null}
              className="!mt-1"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <Button
                className="!p-0 !w-auto !h-auto !m-auto"
                onClick={signOut}
              >
                <div className="px-4 py-[6px] text-md capitalize rounded-md font-semibold flex items-center justify-center hover:text-red-500 duration-500">
                  Sign Out
                </div>
              </Button>
            </Menu>
          </>
        ) : (
          <Button
            className="!p-0 !w-auto !h-auto !m-auto shine !ml-2"
            onClick={() => push('/login')}
          >
            <div className="bg-[#F5BA31] px-4 py-[6px] text-md capitalize rounded-md font-semibold flex items-center justify-center">
              Sign In
            </div>
          </Button>
        )}
        
      </div>
      {showNav && (
        <div className="flex lg:hidden xl:hidden md:hidden flex-col w-full text-center mt-3">
          <Link href="/new">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Add New Resource
              </h3>
            </a>
          </Link>
          {/* <Link href="/feature-requests">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Feature Requests
              </h3>
            </a>
          </Link> */}
          <Link href="/contributors">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Blogs
              </h3>
            </a>
          </Link>
          <Link href="/contributors">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Events
              </h3>
            </a>
          </Link>
          <Link href="/contributors">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Projects
              </h3>
            </a>
          </Link>
          <Link href="/contributors">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Contributors
              </h3>
            </a>
          </Link>
          <Link href="/reviews">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                On Review
              </h3>
            </a>
          </Link>
          <Link href="/reviews">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Our Team
              </h3>
            </a>
          </Link>
          <Link href="/collections">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Collections
              </h3>
            </a>
          </Link>
          <Link href="/bookmarks">
            <a className="p-2 w-full flex items-center justify-center border border-[#764dff] bg-pattern rounded-md my-[3px]">
              <h3 className="font-bold continuous-line text-center text-white">
                Bookmarks
              </h3>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
