import React, { useState } from "react";
import { useRouter } from 'next/router';

// uuid
import { v4 as uuidv4 } from "uuid";

// toaster
import toast from "react-hot-toast";

// Btn
import { Btn, Header } from "../components";
import { FiCheck, FiX } from "react-icons/fi";

// material ui select
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import axios from "axios";


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = (props) => {

  // default values
  const [values, setValues] = useState({
    email: "",
    mobileno: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    gender: "",
    batch: "",
    course: "",
  });
  const [isValidUsername, setIsValidUsername] = useState(true);
  const { email, mobileno ,firstname, lastname, username, password, gender, batch, course } = values;

  const { push } = useRouter();

  useEffect(() => {
    setIsValidUsername(true)
  },[username])

  // destructuring values

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // submit event
  const onSubmit = async (e) => {
    e.preventDefault();

    const getUser = async () => {
      const duplicate = await fetch(
        `http://localhost:3000/api/GET/users/${username}`,
        {
          method: "GET",
        }
      );
      const isuserexist = await duplicate.json();
      if(isuserexist?.length != 0) {
        setIsValidUsername(false);
        toast.error("Username is not valid");
      }
      else {
        setIsValidUsername(true);
      }
    }
    if(username != "") getUser();

    if(!EMAIL_REGEX.test(email)) {
      toast.error("Email is not valid");
      return;
    }

    if(!MOBILE_REGEX.test(mobileno)) {
      toast.error("Mobile number is not valid");
      return;
    }

    if(!firstname) {
      toast.error("Firstname is empty");
      return;
    }

    if(!lastname) {
      toast.error("Lastname is empty");
      return;
    }

    if(!USER_REGEX.test(username) || !isValidUsername) {
      toast.error("Username is not valid");
      return;
    }
    
    if(!PWD_REGEX.test(values.password)) {
      toast.error("Password is not valid");
      return;
    }

    if(!values.gender) {
      toast.error("Gender is not selected");
      return;
    }

    if(!values.batch) {
      toast.error("Batch is not selected");
      return;
    }

    if(!values.course) {
      toast.error("Course is not selected");
      return;
    }


    // logic
    try {
      const response = await fetch("/api/POST/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          mobileno,
          firstname,
          lastname,
          username,
          password,
          gender,
          batch,
          course,
        }),
      });

      const {success, error} = await response.json();
      if(error != undefined) {
        toast.error(error);
      } else if(success != undefined) {
        // toasting success
        toast.success(success);

        // making everything default
        setValues({
          email: "",
          mobileno: "",
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          gender: "",
          batch: "",
          course: "",
        });
        push('/login');
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const genderList = [
    "Male",
    "Female"
  ];

  const batchList = [
    "2021",
    "2020"
  ];

  const courseList = [
    "B.Tech",
    "MCA"
  ]

  return (
    <div className="w-full h-full bg-image">
      <div className="h-full min-h-screen text-[#ECF2F5] w-full p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Register
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Email
              </label>
              <div
                className={`flex border-[1.75px] mb-3 rounded-md items-center dark:bg-[#1f1f1f] ${
                  email == "" ? "" : EMAIL_REGEX.test(email) ? "border-green-500" : "border-red-500"
                }`}
              >
                <input
                  className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white bg-transparent"
                  value={email}
                  onChange={handleChange("email")}
                  type="text"
                  placeholder="Email"
                />
                {email == "" ? null : EMAIL_REGEX.test(email) ? (
                  <FiCheck className="text-green-500 text-2xl mr-2" />
                ) : (
                  <FiX className="text-red-500 text-xl mr-2" />
                )}
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Mobile Number
              </label>
              <div
                className={`flex border-[1.75px] mb-3 rounded-md items-center dark:bg-[#1f1f1f] ${
                  mobileno == "" ? "" : MOBILE_REGEX.test(mobileno) ? "border-green-500" : "border-red-500"
                }`}
              >
                <input
                  className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white bg-transparent"
                  value={mobileno}
                  onChange={handleChange("mobileno")}
                  placeholder="9876543210"
                />
                {mobileno == "" ? null : MOBILE_REGEX.test(mobileno) ? (
                  <FiCheck className="text-green-500 text-2xl mr-2" />
                ) : (
                  <FiX className="text-red-500 text-xl mr-2" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                First Name
              </label>
              <input
                className="appearance-none border-[1.75px] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={firstname}
                onChange={handleChange("firstname")}
                type="text"
                placeholder="First Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Last Name
              </label>
              <input
                className="appearance-none border-[1.75px] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white"
                value={lastname}
                onChange={handleChange("lastname")}
                type="text"
                placeholder="Last Name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Username
              </label>
              <div
                className={`flex border-[1.75px] mb-3 rounded-md items-center dark:bg-[#1f1f1f] ${
                  username == "" ? "" : !USER_REGEX.test(username) || !isValidUsername ? "border-red-500" : "border-green-500"
                }`}
              >
                <input
                  className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white bg-transparent"
                  value={username}
                  onChange={handleChange("username")}
                  type="text"
                  placeholder="Username"
                />
                {username == "" ? null : !USER_REGEX.test(username) || !isValidUsername ? (
                  <FiX className="text-red-500 text-xl mr-2" />
                ) : (
                  <FiCheck className="text-green-500 text-2xl mr-2" />
                )}
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Password
              </label>
              <div
                className={`flex border-[1.75px] mb-3 rounded-md items-center dark:bg-[#1f1f1f] ${
                  password == "" ? "" : PWD_REGEX.test(password) ? "border-green-500" : "border-red-500"
                }`}
              >
                <input
                  className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white bg-transparent"
                  value={password}
                  onChange={handleChange("password")}
                  type="text"
                  placeholder="Password"
                />
                {password == "" ? null : PWD_REGEX.test(password) ? (
                  <FiCheck className="text-green-500 text-2xl mr-2" />
                ) : (
                  <FiX className="text-red-500 text-xl mr-2" />
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Gender
              </label>
              <Select
                value={gender}
                onChange={handleChange("gender")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {genderList.map((gender, key) => (
                  <MenuItem value={gender} key={key}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Batch
              </label>
              <Select
                value={batch}
                onChange={handleChange("batch")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {batchList.map((batch, key) => (
                  <MenuItem value={batch} key={key}>
                    {batch}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#fafafa]">
                Course
              </label>
              <Select
                value={course}
                onChange={handleChange("course")}
                className="shadow appearance-none border rounded w-full pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#1f1f1f] dark:border-[#555] dark:text-white flex justify-center pl-3 Epilogue-Imp"
              >
                {courseList.map((course, key) => (
                  <MenuItem value={course} key={key}>
                    {course}
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
                  Register
                </button>
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
