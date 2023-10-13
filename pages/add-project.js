import React, { useState } from "react";
import { Btn, Header } from "../components";

// uuid
import { v4 as uuidv4 } from "uuid";

// toaster
import toast from "react-hot-toast";
import axios from "axios";
import Tags from "../components/utils/Tags";
import DynamicInputFields from "../components/utils/DynamicInputFields";

const Addproject = (props) => {
  const { user } = props;

  const handleChildTagsChange = (childTags) => {
    setValues(prev=>{return {...prev,technologies: childTags}})
  };

  const [formData, setFormData] = useState([]);

  // Callback function to update the formData state
  const handleFormDataChange = (newData) => {
    setFormData(newData);
    setValues(prev=>{return {...prev,members: newData}})
  };

  // default values
  const [values, setValues] = useState({
    project_name: "",
    project_url:"",
    project_description: "",
    technologies:[],
    mentor_name: "",
    members:[],
    company_name: "",
    company_address: "",
    company_contact: "", 
    company_city: "",


  });
// console.log(values)
  const { project_name,project_url,project_description,mentor_name,technologies,members,company_name,company_address,company_contact,company_city} = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // alert([project_name,project_url,[parentTags],JSON.stringify(formData),project_description,mentor_name,company_name,company_address,company_contact,company_city ])
    

    // logic
    if (user.email) {
      const requests = await axios.get("/api/GET/requests");

      if (
        requests.data.filter((e) => e.addedby.email === user.email).length < 3
      ) {
        if (project_name&& project_url && technologies && formData && mentor_name && project_description ) {
          let uuid = uuidv4().replace(/-/g, "");
          try {
            await fetch("/api/POST/projectadd", {
              method: "POST",
              body: JSON.stringify({
                project_name,
                project_url,
                technologies,
                members,
                project_description,
                mentor_name,
                company_information:{
                  company_name,
                  company_address,
                  company_contact,
                  company_city
                },
                addedby: {
                  displayName: user.displayName
                    ? user.displayName
                    : "Anonymous",
                  email: user.email && user.email,
                },
              }),
            });

            // toasting success
            toast.success("Successfully Created!");

            // making everything default
            setValues({
              project_name: "",
              project_url:"",
              project_description: "",
              technologies:[],
              members:[],
              mentor_name: "",
              company_name: "",
              company_address: "",
              company_contact: "", 
              company_city: "",
           
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
          `You already have ${
            requests.data.filter((e) => e.addedby.email === user.email).length
          } requests`
        );
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
          Add Project
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={project_name}
                onChange={handleChange("project_name")}
                type="text"
                placeholder="Project Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project Url
              </label>
              <input  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={project_url}
                onChange={handleChange("project_url")}
                type="text"
                placeholder="Project Url"
              />
            </div>

            
            <div className="-mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={project_description}
                onChange={handleChange("project_description")}
                placeholder="Project Description"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project Technology
              </label>
              <Tags onTagsChange={handleChildTagsChange} />
              
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project mentor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={mentor_name}
                onChange={handleChange("mentor_name")}
                type="text"
                placeholder="Mentor Name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Project Members
              </label>
              <DynamicInputFields onFormDataChange={handleFormDataChange}/>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Company Information
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={company_name}
                onChange={handleChange("company_name")}
                type="text"
                placeholder="Company Name"
              /> <br /><br />
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Company Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={company_address}
                onChange={handleChange("company_address")}
                type="text"
                placeholder="Company Address"
              /><br /><br />
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Company Contact
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={company_contact}
                onChange={handleChange("company_contact")}
                type="text"
                placeholder="Company Contact"
              /><br /><br />
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Company City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={company_city}
                onChange={handleChange("company_city")}
                type="text"
                placeholder="Company City"
              /><br />
            </div>

            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Add Project
                </button>
              </Btn>
              <div className="flex items-center">
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproject;
