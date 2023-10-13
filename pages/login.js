import React, { useState } from "react";
import { useRouter } from 'next/router';

// uuid
import { v4 as uuidv4 } from "uuid";

// toaster
import toast from "react-hot-toast";

// Btn
import { Btn, Header } from "../components";
import { FiCheck, FiX } from "react-icons/fi";

import { useEffect } from "react";


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Login = ({setUser}) => {

//   default values
  const [values, setValues] = useState({
    email: "",
    mobileno: "",
    username: "",
    password: "",
  });
  const [isValidUsername, setIsValidUsername] = useState(true);
  const { email, mobileno ,username, password } = values;

  const { push } = useRouter();

  useEffect(() => {

    const getUser = async () => {
        const duplicate = await fetch(
            `http://localhost:3000/api/GET/users/${username}`,
            {
              method: "GET",
            }
        );
        const isuserexist = await duplicate.json();
        if(isuserexist?.length == 0) {
            setIsValidUsername(false);
        }
        else {
            setIsValidUsername(true);
        }
    }

    if(username != "") getUser();
  },[username])

  // destructuring values

  // handleChange of inputs
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // submit event
  const onSubmit = async (e) => {
    e.preventDefault();
    // if(!EMAIL_REGEX.test(email)) {
    //   toast.error("Email is not valid");
    //   return;
    // }

    // if(!MOBILE_REGEX.test(mobileno)) {
    //   toast.error("Mobile number is not valid");
    //   return;
    // }

    if(!USER_REGEX.test(username) || !isValidUsername) {
      toast.error("Username is not valid");
      return;
    }
    
    if(!PWD_REGEX.test(values.password)) {
      toast.error("Password is not valid");
      return;
    }


    //logic
    try {
        const response = await fetch("/api/POST/login", {
            method: "POST",
            body: JSON.stringify({
              email,
              mobileno,
              username,
              password,
            }),
        });
        const data = await response.json();
        const accessToken = data?.accessToken;
        const email = data?.email;
        const displayName = data?.displayName;
        localStorage.setItem("profile", JSON.stringify({ email, displayName, username, accessToken }));
        setUser({ email, displayName, username, accessToken });

        // making everything default
        setValues({
            email: "",
            mobileno: "",
            username: "",
            password: "",
        });
        push('/');
    } catch (err) {
        console.log(err);
        // if (!err?.response) {
        //     setErrMsg('No Server Response');
        // } else if (err.response?.status === 400) {
        //     setErrMsg('Missing Username or Password');
        // } else if (err.response?.status === 401) {
        //     setErrMsg('Unauthorized');
        // } else {
        //     setErrMsg('Login Failed');
        // }
        // errRef.current.focus();
    }
  };

  return (
    <div className="w-full h-full bg-image">
      <div className="h-full min-h-screen text-[#ECF2F5] w-full p-3 flex items-center justify-center flex-col">
        <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-1 lg:mb-3 xl:mb-3 text-center">
          Login
        </h1>
        <div className="w-full lg:w-7/12 xl:w-7/12 h-full bg-white dark:bg-[#2f2f2f] rounded-xl m-1">
          <form
            className="bg-transparent rounded-xl h-full px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
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

            <div className="flex items-center justify-between">
              <Btn>
                <button
                  className="bg-app-gradient border border-[#391637] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline shine"
                  type="submit"
                >
                  Login
                </button>
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
