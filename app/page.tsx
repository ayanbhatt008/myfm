"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
//

export default function Home() {
  const [response, setResponse] = useState("def");


  const handleSubmit = async() => {
    
    window.location.href  = "/api/auth/login";
  }



  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <button onClick={handleSubmit} className = "px-4 py-2 bg-blue-500 text-white rounded"> {response} </button>
      
    </div>
  );
}
