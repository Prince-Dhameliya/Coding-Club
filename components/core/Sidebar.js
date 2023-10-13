import React, { useEffect, useState } from "react";

// material design sidebar
import Drawer from "@material-ui/core/Drawer";
import { Tab, Tabs } from "@material-ui/core";

// icons
import { FiChevronRight } from "react-icons/fi";

// fetching data

// lodash
import _ from "lodash";

// link
import Link from "next/link";
import axios from "axios";

//Drop
import List from '@material-ui/core/List';
import DropItem from "../../components/utils/DropItem";

{/* filteredChapters.map((chapter,key) => (
                <Link href={`/chapter/${chapter.name}`} key={key}>
                  <a className="w-[92.5%] py-2 border border-[#ddd] duration-500 bg-white hover:border-[#4469FA] focus:border-[#4469FA] rounded-md px-3 flex justify-between items-center category-hover my-1 dark:bg-[#1f1f1f] dark:border-[#555]">
                    <h1 className="text-md text-[#222] dark:text-[#fafafa]">
                      {chapter.name}
                    </h1>
                    <FiChevronRight className="text-xl icon duration-300" />
                  </a>
                </Link> 
                
              )) */}

const Sidebar = ({ showDrawer, toggleDrawer, darkMode, checked, setChecked }) => {
  // data
  const [categories, setCategories] = useState([]);
  const [chapters, setChapters] = useState([]);

  // current tab
  const [value, setValue] = useState("chapters");

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // handleChange of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchTerm(""); // normalize inputs
  };

  // const removeDuplicate = (arr) => {
  //   const cheatSheets = []; // default state

  //   arr.length > 0 &&
  //     arr.forEach((item) => {
  //       const url = new URL(
  //         item.website_url ? item.website_url : "https://google.com"
  //       );

  //       // creating a new item
  //       cheatSheets.push({
  //         name: item.name,
  //         url: url.hostname,
  //       });
  //     });
  //   return _.uniqBy(cheatSheets, "url"); // lodash method of removing duplicates
  // };

  useEffect(async () => {
    // fetching
    const categories = await axios.get("/api/GET/categories");

    // fetching
    const chapters = await axios.get("/api/GET/chapters");

    // data to be used
    await setCategories(categories && categories.data);
    await setChapters(chapters && chapters.data);
  }, []);

  // filtering posts (search)
  const filterChapters = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter((chapter) => {
      const chapterName = chapter.name.toLowerCase();
      return chapterName.includes(query.toLowerCase());
    });
  };

  // filtering categories
  const filterCategories = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter((category) => {
      const categoryName = category.name.toLowerCase();
      return categoryName.includes(query.toLowerCase());
    });
  };

  // all chapter gets stored here
  const filteredChapters = filterChapters(chapters, searchTerm);

  // all categories gets stored here
  const filteredCategories = filterCategories(categories, searchTerm);
  

  return (
    <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
      <div
        className={`${
          darkMode ? "dark bg-[#2f2f2f] text-white" : "light"
        } w-[85vw] lg:w-[25vw] md:w-[65vw] xl:w-[25vw] h-full flex items-center justify-between flex-col bg-[#ECF2F5] relative overflow-y-scroll`}
      >
        <div className="w-full h-auto sticky top-0 left-0">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            className="bg-white border border-t-[#ccc] dark:bg-[#1f1f1f] dark:border-[#666] white-light-shadow"
          >
            <Tab label="Chapters" value="chapters" />
            <Tab label="Categories" value="categories" />
          </Tabs>
        </div>
        <div className="h-full w-full flex items-center flex-col py-3">
          <input
            type="text"
            className="w-[92.5%] border white-light-shadow border-[#4469FA] hover:border-[#4469FA] focus:border-[#4469FA] rounded-md px-3 py-2 dark:bg-[#1f1f1f]"
            placeholder={`Search ${
              value.charAt(0).toUpperCase() + value.slice(1)
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-full flex px-3 my-2 mt-3 items-center">
            <div className="w-1/12 h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
            <h3 className="mx-1 text-[#555] capitalize dark:text-[#ddd]">
              {value}
            </h3>
            <div className="w-full h-[1px] rounded-sm bg-[#bbb] dark:bg-[#555]"></div>
          </div>

          {value === "chapters"
            ? filteredChapters &&
              chapters.length > 0 &&
              (<List style={{width: "100%", display: "flex", flexDirection: "column", gap: "10px"}}>
                  {filteredChapters.map((chapter, index) => {
                    return <DropItem key={index} chapter={chapter} checked={checked} setChecked={setChecked} />
                  })}
              </List>)
            : categories.length > 0 &&
              filteredCategories.map((category,key) => (
                <Link href={`/category/${category.name}`} key={key}>
                  <a className="w-[92.5%] py-2 border border-[#ddd] duration-500 bg-white hover:border-[#4469FA] focus:border-[#4469FA] rounded-md px-3 flex justify-between items-center category-hover my-1 dark:bg-[#1f1f1f] dark:border-[#555]">
                    <h1 className="text-md text-[#222] dark:text-[#fafafa]">
                      {category.name}
                    </h1>
                    <FiChevronRight className="text-xl icon duration-300" />
                  </a>
                </Link>
              ))}
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
