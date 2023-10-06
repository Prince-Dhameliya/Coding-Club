import React, { useState } from "react";
import { Btn, Header } from "../components";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";

const AddEvent = (props) => {
  const { user, roles, ROLES } = props;

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
  // default values
  const [values, setValues] = useState({
    event_name: "",
    event_url:"",
    event_description: "",
    event_venue: "",
    event_date: "",
    event_start_time: "", 
    event_end_time: "",
    event_resources: "",
  });
// console.log(values)
  let { event_name, event_url, event_description, event_venue, event_date, event_start_time, event_end_time, event_resources} = values;

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    

    // logic
    if (user.username && roles?.find(role => [ROLES.Admin]?.includes(role))) {
      if (is_url(event_url)) {
          if (event_name && event_url && event_venue && event_description && event_date && event_start_time && event_end_time && event_resources ) {
            let uuid = uuidv4().replace(/-/g, "");
            var [h, m] = event_start_time.split(":");
            event_start_time = `${(h % 12 ? h % 12 : 12)}:${m} ${(h >= 12 ? 'PM' : 'AM')}`;
            if(event_end_time != "") {
              var [h, m] = event_end_time.split(":");
              event_end_time = `${(h % 12 ? h % 12 : 12)}:${m} ${(h >= 12 ? 'PM' : 'AM')}`;
            }

            try {
              await fetch("/api/POST/event", {
                method: "POST",
                body: JSON.stringify({
                  event_name,
                  event_url,
                  event_description,
                  event_venue,
                  event_date,
                  event_time: event_start_time+ `${event_end_time ? " To " : ""}` + event_end_time,
                  event_resources,
                  addedby: {
                    displayName: user.displayName
                      ? user.displayName
                      : "Anonymous",
                    username: user.username && user.username,
                  },
                }),
              });

              // toasting success
              toast.success("Event created successfully!");

              // making everything default
              setValues({
                event_name: "",
                event_url:"",
                event_description: "",
                event_venue: "",
                event_date: "",
                event_start_time: "", 
                event_end_time: "",
                event_resources: ""
              });
            } catch (err) {
              console.log(err);
              toast.error("Something went wrong");
            }
          } else {
            toast.error("Please Fill All Fields");
          }
      } else {
        toast.error("Enter Valid URL");
      }
    } else {
      toast.error("UnAuthorized Action");
    }
  };
  return (
    <div className="w-full h-full bg-image">
      <Header {...props} />
      <div className="h-full min-h-screen text-[#ECF2F5] w-full bg-image p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Add Event
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                 Event Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_name}
                onChange={handleChange("event_name")}
                type="text"
                placeholder="name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Url
              </label>
              <input  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_url}
                onChange={handleChange("event_url")}
                type="text"
                placeholder="event_url"
              />
            </div>

            
            <div className="-mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_description}
                onChange={handleChange("event_description")}
                placeholder="event_description"
              />
            </div>
            
           
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Venue
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_venue}
                onChange={handleChange("event_venue")}
                type="text"
                placeholder="event_venue"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_date}
                onChange={handleChange("event_date")}
                type="date"
                placeholder="event-date"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Start Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_start_time}
                onChange={handleChange("event_start_time")}
                type="time"
                placeholder="Event Start Time"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event End Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_end_time}
                onChange={handleChange("event_end_time")}
                type="time"
                placeholder="Event End Time"
              />
            </div>

            <div className="-mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Event Resources
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={event_resources}
                onChange={handleChange("event_resources")}
                placeholder="event_resources"
              />
            </div>
            
            
            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Add Event
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

export default AddEvent;
