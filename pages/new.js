import React, { useState } from "react";

// uuid
import { v4 as uuidv4 } from "uuid";

// toaster
import toast from "react-hot-toast";

// Btn
import { Btn, Header } from "../components";

// material ui select
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import axios from "axios";
import CarouselSliderPreview from "../components/utils/CarouselSliderPreview";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {app} from "../Config/FirebaseConfig"

const New = (props) => {
  const { user } = props;

  const storage = getStorage(app);

  // data
  const [categories, setCategories] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  let   [files, setFiles] = useState([]);

  // default values
  const [values, setValues] = useState({
    resource_name: "",
    resources: [],
    resource_description: "",
    resource_type: "",
    category: "",
  });

  useEffect(async () => {
    // const res = await axios.get("/api/GET/reviews");

    // fetching
    const categories = await axios.get("/api/GET/categories");
    const resourcetypes = await axios.get("/api/GET/resourcetype");

    // data to be used
    await setCategories(categories && categories.data);
    await setResourceTypes(resourcetypes && resourcetypes.data);
  }, []);

  // regex to test whether url is valid
  const is_url = (str) => {
    var pattern = new RegExp(
      "^" +
        "(?:(?:https?|ftp)://)" +
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        ")" +
        "(?::\\d{2,5})?" +
        "(?:/\\S*)?" +
        "$",
      "i"
    );
    return pattern.test(str);
  };

  // destructuring values
  const { resource_name, resources, resource_description, resource_type, category } = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // submit event
  const onSubmit = async (e) => {
    e.preventDefault();

    // logic
    if (user.username) {
      const res = await axios.get("/api/GET/reviews");
      if (
        res?.data?.filter((e) => e.addedby.username === user.username).length < 3
      ) {
        if (resource_name && files?.length && resource_description && resource_type && category) {
          let uuid = uuidv4().replace(/-/g, "");

          try {

            // resources url array
            let URLs = [];
            
            for (let i = 0; i < files.length; i++) {
              const fileRef = ref(storage, "files/" + files[i].name);

              await uploadBytes(fileRef, files[i])
                .then(async (res) => {
                  await getDownloadURL(fileRef).then(async (downloadURL) => {
                    // console.log("File available at", downloadURL);
                    setValues(await {...values, resources: [...values.resources, downloadURL]});
                    URLs.push(downloadURL);
                    toast.success("File Uploaded Successfully!");
                  });
                });
                // .then((snapshot) => {
                //   console.log("Uploaded a blob or file!");
                // })
            }

            await fetch("/api/POST/resource", {
              method: "POST",
              body: JSON.stringify({
                resource_name,
                resources: URLs,
                resource_description,
                resource_type,
                category,
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
            setFiles([]);
            setValues({
              resource_name: "",
              resources: [],
              resource_description: "",
              resource_type: "",
              category: "",
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
          `Your ${
            res.data.filter((e) => e.addedby.username === user.username)
              .length
          } Resources are already on review`
        );
      }
    } else {
      toast.error("Please Sign In");
    }
  };
  

  return (
    <div className="w-full h-full bg-image">
      <Header {...props} />
      
      <div className="h-full min-h-screen text-[#ECF2F5] w-full p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Create New Resources
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Resource Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={resource_name}
                onChange={handleChange("resource_name")}
                type="text"
                placeholder="Resource Name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Resource Type
              </label>
              <Select
                value={resource_type}
                onChange={handleChange("resource_type")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {resourceTypes?.map((resource_type, key) => (
                  <MenuItem value={resource_type.name} key={key}>
                    {resource_type.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Upload Same Type Of Multiple Files
              </label>
              
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg style={{height: "50px"}} className="w-8 h-8 mb-4 text-gray-700 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-700 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-700 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={(e)=> {setFiles([...files, ...Array.from(e.target.files)])}} multiple />
              </label>
            </div>

            { files?.length > 0 && 
              <div className="flex" >
                  {files?.map((file,index)=>{
                    return <CarouselSliderPreview key={index} setFiles={setFiles} file={file} />
                  })}
              </div>
            }

            {/* <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Website URL
              </label>
              <div
                className={`flex border-[1.75px] mb-3 rounded-md items-center dark:bg-[#1f1f1f] ${
                  is_url(website_url) ? "border-green-500" : "border-red-500"
                }`}
              >
                <input
                  className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white bg-transparent"
                  value={website_url}
                  onChange={handleChange("website_url")}
                  placeholder="https://hashnode.com/"
                />
                {is_url(website_url) ? (
                  <FiCheck className="text-green-500 text-2xl mr-2" />
                ) : (
                  <FiX className="text-red-500 text-xl mr-2" />
                )}
              </div>
            </div> */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Resource Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={resource_description}
                onChange={handleChange("resource_description")}
                type="text"
                placeholder="Resource Description"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Category
              </label>
              <Select
                value={category}
                onChange={handleChange("category")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {categories?.map((category, key) => (
                  <MenuItem value={category.name} key={key}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          
            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Add New Resource
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

export default New;
