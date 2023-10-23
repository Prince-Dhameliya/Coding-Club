import React, { useState } from "react";
import { Btn, Header } from "../components";
import CarouselSliderPreview from "../components/utils/CarouselSliderPreview";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {app} from "../Config/FirebaseConfig"

// uuid
import { v4 as uuidv4 } from "uuid";

// toaster
import toast from "react-hot-toast";
import axios from "axios";

const Addproject = (props) => {
  const { user } = props;
  
  const storage = getStorage(app);

  let   [files, setFiles] = useState([]);
  // default values
  const [values, setValues] = useState({
    cordinator_name: "",
    cordinator_roel:"",
    resources: [],
    cordinator_contact:"",
    cordinator_github: "",
    cordinator_linkedin: "",
    cordinator_email: "",


  });
// console.log(values)
  const { cordinator_name,cordinator_role, resources, cordinator_contact, cordinator_github,cordinator_linkedin,cordinator_email} = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // logic
    if (user.username) {
      if (cordinator_name && cordinator_role && files?.length && cordinator_contact && cordinator_github) {
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
          await fetch("/api/POST/cordinator", {
            method: "POST",
            body: JSON.stringify({
              cordinator_name,
              cordinator_role,
              resources: URLs,
              cordinator_contact,
              cordinator_github,
              cordinator_linkedin,
              cordinator_email,
          
            }),
          });

          // toasting success
          toast.success("Successfully Created!");

          // making everything default
          setFiles([]);
          setValues({
            cordinator_name: "",
            cordinator_role:"",
            resources: [],
            cordinator_contact:"",
            cordinator_github: "",
            cordinator_linkedin: "",
            cordinator_email: "",
         
          });
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
  return (
    <div className="w-full h-full bg-image">
      <Header {...props} />
      <div className="h-full min-h-screen text-[#ECF2F5] w-full bg-image p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Add Cordinator
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_name}
                onChange={handleChange("cordinator_name")}
                type="text"
                placeholder="Cordinator Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Role
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_role}
                onChange={handleChange("cordinator_role")}
                type="text"
                placeholder="Cordinator Role"
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



            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Mobile No.
              </label>
              <input  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_contact}
                onChange={handleChange("cordinator_contact")}
                type="text"
                placeholder="Cordinator Mobile No."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Github Url
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_github}
                onChange={handleChange("cordinator_github")}
                type="text"
                placeholder="Cordinator Github Url"
              />
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Linkedin Url
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_linkedin}
                onChange={handleChange("cordinator_linkedin")}
                type="text"
                placeholder="Cordinator Linkedin Url"
              /> <br /><br />

              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={cordinator_email}
                onChange={handleChange("cordinator_email")}
                type="text"
                placeholder="Cordinator Email"
              /><br />
            </div>

            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Add Cordinator
                </button>
              </Btn>
              {/* <div className="flex items-center">
                <h3 className="text-green-400 font-medium">
                  Adding As {""}
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
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproject;
