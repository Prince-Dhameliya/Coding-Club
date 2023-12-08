import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { Btn, Header } from "../components";
import { FiCheck, FiX } from "react-icons/fi";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import axios from "axios";
import CarouselSliderPreview from "../components/utils/CarouselSliderPreview";

import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {app} from "../Config/FirebaseConfig"

import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Newblog = (props) => {
  const { user } = props;

  const storage = getStorage(app);

  const [values, setValues] = useState({
    blog_title: "",
    blog_images: "", // New field for image URL
    blog_description: "",
    category: "select-category",
  });

  // data
  const [categories, setCategories] = useState([]);
  let   [files, setFiles] = useState([]);

  useEffect(async () => {
    // fetching
    const categories = await axios.get("/api/GET/categories");

    // data to be used
    await setCategories(categories && categories.data);
  }, []);

  // Destructuring values
  const { blog_title, blog_images, blog_description, category } = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // submit event
  const onSubmit = async (e) => {
    e.preventDefault();

    // logic
    if (user.username) {
      if (files?.length && blog_title && blog_description && category != "select-category") {
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
                  setValues(await {...values, blog_images: [...values.blog_images, downloadURL]});
                  URLs.push(downloadURL);
                  toast.success("File Uploaded Successfully!");
                });
              });
              // .then((snapshot) => {
              //   console.log("Uploaded a blob or file!");
              // })
          }

          await fetch("/api/POST/blog", {
            method: "POST",
            body: JSON.stringify({
             blog_title,
             blog_images: URLs, 
             blog_description,
             category,
             addedby: {
               // photoURL: user.photoURL ? user.photoURL : "",
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
          // setFiles([]);
          // setValues({
          //   blog_title: "",
          //   blog_images: "", // New field for image URL
          //   blog_description: "",
          //   category: "",
          // });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Please Fill All Fields");
      }
    } else {
      toast.error("Please Sign In");
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  }

  return (
    <div className="w-full h-full bg-image">
      <div className="h-full min-h-screen text-[#ECF2F5] w-full p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Add Blog
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={blog_title}
                onChange={handleChange("blog_title")}
                type="text"
                placeholder="Enter your title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Upload Photo
              </label>
              
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg style={{height: "50px"}} className="w-8 h-8 mb-4 text-gray-700 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-700 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      
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
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Description
              </label>
               <ReactQuill
                  className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                  id='editor'
                  modules={modules}
                  theme="snow"
                  value={blog_description}
                  onChange={(description)=>{setValues({...values, blog_description: description})}}
                  placeholder="Start Writing From here"
                  required
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
                <MenuItem value={"select-category"} key={-1}>
                    {"Select Category"}
                </MenuItem>
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
                  Add New Blog
                </button>
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newblog;

