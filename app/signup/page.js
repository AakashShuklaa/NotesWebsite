'use client';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'


const signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password1: "",
    password2: ""
  })

  const onSignup = async () => {
    try {
      if(user.password1 != user.password2){
        alert("Both passwords don't match")
        return
      }
      console.log(user);
      const response = await axios.post('/api/users/signup', user);
      console.log("signup success", response.data.message);
      router.push('/login', { scroll: false })
    } catch (error) {
      console.log("Signup failed");
      alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300">

        <div className="flex flex-col items-center justify-center bg-slate-50 gap-3 border-2 border-white rounded-2xl p-16 shadow-2xl">
          <p className="text-2xl font-bold">Sign up with us</p>
          <p className="text-gray-700 text-xl font-medium">
            Enter your email and password to setup you account
          </p>

          <div className="flex flex-col gap-5">
            <label
              className="block text-gray-700 font-medium text-l -mb-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="rounded-md h-7 p-5 border-2 border-gray-300 focus:border-blue-500 outline-none font-medium"
              type="email"
              placeholder="enter your email here"
              id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}
            />

            <label
              className="block text-gray-700 font-medium text-l -mb-3"
              htmlFor="password1"
            >
              Password
            </label>
            <input
              className="rounded-md h-7 p-5 border-2 border-gray-300 focus:border-blue-500 outline-none font-medium"
              type="password"
              placeholder="enter your password "
              id="password1" value={user.password1} onChange={(e) => setUser({...user, password1: e.target.value})}
            />

            <label
              className="block text-gray-700 font-medium  text-l -mb-3"
              htmlFor="password2"
            >
              Re-enter Password
            </label>
            <input
              className="rounded-md h-7 p-5 border-2 border-gray-300 focus:border-blue-500 outline-none font-medium"
              type="password"
              placeholder="re-enter your password"
              id="password2" value={user.password2} onChange={(e) => setUser({...user, password2: e.target.value})}
            />

            <button
              type="submit"
              onClick={onSignup}
              className="bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-blue-500 hover:to-pink-400  text-white font-medium rounded-md w-max p-2 mx-auto"
            >
              Signup Now
            </button>
          </div>
        </div>
    </div>
  );
};

export default signup;
