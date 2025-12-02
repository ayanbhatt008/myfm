"use client"

import Image from "next/image";


import {SpotifyTopTrackResponse} from "@/lib/spotify/types";

export default  function Dashboard() {





    const handleClick = async function () {
        const res = await fetch("/api/spotify/top-tracks")
        if (!res.ok) console.log("no ok")
        const data : SpotifyTopTrackResponse = await res.json()
        console.log("from page", data)

    }

    return (
        <div>
            <div className="bg-blue-900 text-2xl text-white text-center">
                <button onClick={handleClick}>HI</button>
            </div>

            <div
                className={"flex-1 bg-[#191414] rounded-2xl p-10 border border-white/10 shadow-lg flex flex-col self-center items-center gap-6"}>
                <a href={"/api/auth/spotify/login"} className={"flex flex-col items-center gap-10"}>
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
    )
}