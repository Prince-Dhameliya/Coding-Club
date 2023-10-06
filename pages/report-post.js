import React, { useState, useEffect } from "react";

// use router next
import { useRouter } from "next/router";

// Btn
import { Btn, Header } from "../components";

// material ui select
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import axios from "axios"; // axios
import toast from "react-hot-toast"; // toast

// utils

const reportPost = (props) => {
  const { user } = props;

  // states
  const router = useRouter();

  let { id, resource_name } = router.query;

  const [values, setValues] = useState({
    resource_id: id,
    type: "broken-link",
    reason: "",
  });

  const { resource_id, type, reason } = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // logic
    if (user.username) {
      const reported = await axios.get("/api/GET/reported");

      if (
        reported.data.filter((e) => e.addedby.username === user.username).length < 3
      ) {
        if (id && type) {
          try {
            await fetch("/api/POST/reported", {
              method: "POST",
              body: JSON.stringify({
                resource_id: resource_id,
                type: type,
                reason: reason,
                addedby: {
                  displayName: user.displayName
                    ? user.displayName
                    : "Anonymous",
                  username: user.username && user.username,
                },
              }),
            });

            // toasting success
            toast.success("Successfully Created!");

            // making everything default
            setValues({
              resource_id: id,
              type: "broken-link",
              reason: "",
            });
          } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
          }
        } else {
          toast.error("Please Fill All Fields");
        }
      } else {
        toast.error(
          `You have already reported ${
            reported.data.filter((e) => e.addedby.username === user.username).length
          } resources`
        );
      }
    } else {
      toast.error("Please Sign In");
    }
  };

  // types examples
  const types = [
    {
      type: "Broken Link",
      value: "broken-link",
    },
    {
      type: "Wrong Category",
      value: "wrong-category",
    },
    {
      type: "Outdated Information",
      value: "outdated-information",
    },
    {
      type: "Its Spam",
      value: "spam",
    },
    {
      type: "This should not be on codingclub",
      value: "should-not-be-on-codingclub",
    },
    {
      type: "Other",
      value: "other",
    },
  ];
  return (
    <div className="w-full h-full bg-image">
      <Header {...props} />
      <div className="h-full min-h-screen text-[#ECF2F5] w-full bg-image p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Report Resource
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-4 mb-4"
            onSubmit={onSubmit}
          >
            {resource_name && (
              <div className="w-full flex flex-col justify-items-center mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                    Resource Name
                  </label>
                  <h1 className="text-2xl font-bold text-[#222] dark:text-[#fafafa]">
                    {resource_name}
                  </h1>
                  {/* <p className="text-sm text-[#666] dark:text-[#aaa]">
                  {resource_description
                    ? resource_description.slice(0, 150)
                    : "Description not found"}
                  </p> */}
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Reason
              </label>
              <Select
                value={type}
                onChange={handleChange("type")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {types.map((type, key) => (
                  <MenuItem value={type.value} key={key}>
                    {type.type}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="-mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                {"Tell Us More About Reason (optional)"}
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={reason}
                placeholder="Reason"
                onChange={handleChange("reason")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Submit Report
                </button>
              </Btn>
              <div className="flex items-center">
                <h3 className="text-green-400 font-medium">
                  Adding As{" "}
                  {user.username ? (
                    <span className="font-bold">
                      {user.displayName ? user.displayName : user.username}
                    </span>
                  ) : (
                    "Anonymous"
                  )}
                </h3>
                <span className="flex h-3 w-3 relative ml-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reportPost;
