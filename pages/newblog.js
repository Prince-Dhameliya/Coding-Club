import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { Btn, Header } from "../components";
import { FiCheck, FiX } from "react-icons/fi";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import axios from "axios";

const Newblog = (props) => {
  const { user } = props;

  //regex to test whether url is valid
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

  const [values, setValues] = useState({
    title: "",
    img: "", // New field for image URL
    desc: "",
    category: "",
    author: "",
  });

  // Destructuring values
  const { title, img, desc, category, author } = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // submit event
  const onSubmit = async (e) => {
    e.preventDefault();
    // Include the 'img' field in your data submission
    // const postData = {
    //   title,
    //   img, // Image URL
    //   desc,
    //   category,
    //   author,
    // };

    // // You can now submit 'postData' to your backend or API
    // // For example, you can use Axios to send a POST request
    // try {
    //   const response = await axios.post('/api/GET/blogs', postData); // Adjust the endpoint
    //   // Handle success or display a success message
    //   toast.success('Blog post created successfully!');
    //   // Reset the form or navigate to another page
    // } catch (error) {
    //   // Handle error or display an error message
    //   toast.error('An error occurred while creating the blog post.');
    // }
    if (user.username) {
      const response = await axios.get("/api/GET/blogs");
       if (is_url(img)) {
         if (
           response.data.filter((e) => e.addedby.username === user.username)
             .length < 3
         ) {
           if (title && img && category) {
             let uuid = uuidv4().replace(/-/g, "");
 
             try {
               await fetch("/api/POST/blog", {
                 method: "POST",
                 body: JSON.stringify({
                  title,
                  img, 
                  desc,
                  category,
                  author,
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
               toast.success("Blog post created successfully!");
 
               // making everything default
               setValues({
                title: "",
                img: "",
                desc: "",
                category: "",
                author: "",
               });
             } catch (err) {
               console.log(err);
               toast.error("Something went wrong");
             }
           } else {
             toast.error("Please Fill All Fields");
           }
         } else {
           //on review
         }
       } else {
         toast.error("URL not valid");
       }
     } else {
       toast.error("Please Sign In");
     }
  };

  const categories = [
    // ... Your categories array ...
    "Data Structures and Algorithms (DSA)",
    "Design Analysis and Algorithms (DAA)",
    "C++",
    "Java",
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "ReactJS",
    "NodeJS",
    "Deep Learning",
    "NLP",
    "Statistical",
    "Regression Analysis",
    "Network Security",
    "IoT",
    "Cloud Security",
    "Firewall",
    "Cryptography",
    "Docker",
    "Cloud Computing",
    "Kubarnates",
    "Software Testing",
  ];

  return (
    <div className="w-full h-full bg-image">
      <div className="h-full min-h-screen text-[#ECF2F5] w-full p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Add Post
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
                value={title}
                onChange={handleChange("title")}
                type="text"
                placeholder="Enter your title"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Image URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={img}
                onChange={handleChange("img")}
                type="text"
                placeholder="Enter image URL"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Description
              </label>
               <textarea
                  rows="5" // Adjust the number of rows as needed
                  cols="100" // Adjust the number of columns as needed
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                  value={desc}
                  onChange={handleChange("desc")}
                  placeholder="Enter your description"
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
                {categories.map((category, key) => (
                  <MenuItem value={category} key={key}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Author Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={author}
                onChange={handleChange("author")}
                placeholder="author"
              />
            </div>
            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Add New Post
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

