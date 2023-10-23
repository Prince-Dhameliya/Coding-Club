import React, { useEffect, useState } from "react";

// router
import { useRouter } from "next/router";

// components
import { Header } from "../../components";

// head
import Head from "next/head";
import axios from "axios";
import EventBar from "../../components/core/EventBar";

const Event = (props) => {
  const router = useRouter(); // router
  // getting the id
  const { id } = router.query;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getEvent = async () => {
      const {data} = await axios.get(`/api/GET/event/${id}`);
      const event = await data[0];
      setData(event);
      setLoading(false);
    }
    if(id !== undefined) getEvent(id);
  }, [id]);

  return (
    <div className="bg-image">
        <Header {...props} />
        <div className="flex flex-col justify-center items-center m-3">
        {loading || data?.length === 0 ? (
        <>
        <div className="w-full lg:w-[65%] xl:w-[65%] bg-white rounded-md white-light-shadow border border-[#ddd] p-7 dark:bg-[#1F1F1F] dark:border-[#555] dark:text-white">
          <div className="h-[325px] pulsate w-full rounded-md"></div>
          <div className="h-[10px] pulsate w-3/12 rounded-sm mt-6"></div>
          <div className="h-[40px] pulsate w-10/12 rounded-md mt-2"></div>
          <div className="h-[10px] pulsate w-full rounded-sm mt-2"></div>
          <div className="flex w-full mt-8">
            <div className="h-[40px] pulsate w-[200px] rounded-md mr-1"></div>
            <div className="h-[40px] pulsate w-[200px] rounded-md mr-1"></div>
          </div>
          </div>
        </>
      ) : (
        <EventBar currentPost={data} />
        )}
        </div>
        </div>
  );
};

export default Event;
