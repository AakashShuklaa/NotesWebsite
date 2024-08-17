'use client';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'


const login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      router.push("/profile")
      alert(response.data.message)

    } catch (error) {
      console.log("Login failed", error.message);
      alert("Login failed check your credentials", error.message)
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300">

        <div className="flex flex-col items-center justify-center bg-slate-50 gap-3 border-2 border-white rounded-2xl p-16 shadow-2xl">
          <p className="text-2xl font-bold">Login to your account</p>
          <p className="text-gray-700 text-xl font-medium">
            Enter your email and password to login 
          </p>

          <div className="flex flex-col gap-5">
            <label
              className="block text-gray-700 font-medium text-l"
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
              className="block text-gray-700 font-medium text-l"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="rounded-md h-7 p-5 border-2 border-gray-300 focus:border-blue-500 outline-none font-medium"
              type="password"
              placeholder="enter your password "
              id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-blue-500 hover:to-pink-400  text-white font-medium rounded-md w-max p-2 mx-auto"
              onClick={onLogin}
            >
              Continue
            </button>
          </div>
        </div>
    </div>
  )
}

export default login
