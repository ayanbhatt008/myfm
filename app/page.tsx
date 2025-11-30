"use client";

import React, {useState} from "react";
import Image from "next/image";

export default function Home() {
    const [response, setResponse] = useState("def");


    const handleSubmit = async () => {

        window.location.href = "/api/auth/login";
    }


    return (
        <div
            className="flex min-h-screen  items-start justify-center bg-zinc-50 font-sans text-black text-center max-w-screen-l">
            <div className={"flex-1 items-start mt-40"}>
                <h1 className={"font-bold text-3xl"}>My.FM</h1>
                <div className={""}>
                    hii
                </div>

            </div>


            <div
                className={"flex-1 bg-[#191414] rounded-2xl p-10 border border-white/10 shadow-lg flex flex-col self-center items-center gap-6"}>
                <a href={"/api/auth/login"} className={"flex flex-col items-center gap-10"}>
                    <Image
                        src={"/Spotify_Full_Logo_RGB_Green.png"}
                        alt={"Spotify Logo"}
                        width={200}
                        height={200}
                    />

                    <div className="bg-[#1ED760] rounded-2xl p-5 gap-6 text-white">
                        Log-In with Spotify
                    </div>


                </a>

            </div>

        </div>
    );
}
