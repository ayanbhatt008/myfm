"use client"

import Image from "next/image";


import {SpotifyTopTrackResponse} from "@/lib/spotify/types";
import {useState, useEffect} from "react";
import { supabase } from "@/lib/supabase/client";
import {getSessionData} from "@/lib/session";
import {useRouter} from "next/navigation"
import { useSpotifyAuth } from "@/lib/hooks/useSpotifyAuth";

export default  function Dashboard() {
    
    const router = useRouter();




    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/")
    }




    return (
        <div>
            <div className="bg-blue-900 text-2xl text-white text-center">
                <h1> hi</h1>
            </div>

            <SpotifyAuth/>
            <div className="flex items-center justify-center p-5">
                <button className = "border border-red-500 border-4 bg-white text-red-500 text-center p-5"
                onClick={handleLogout}>
                    SIGN OUT
                </button>
            </div>
        </div>
    )
}



function SpotifyAuth() {
    
    const {displayName : spotifyDisplayName, loading} = useSpotifyAuth();
    // if null = not logged in; if a string then they are logged in

    console.log("display name " + spotifyDisplayName + " loading: " + loading);




    let auth = null;

    if (loading)
        auth = (<a  className="bg-[#1ED760] rounded-2xl p-5 gap-6 text-white">Loading...</a>)
    else if (spotifyDisplayName)
        auth = (
                    <div className="flex flex-row items-center gap-10">
                        <div className = "bg-[#1ED760] rounded p-5 gap-6 text-white">
                            Logged in as {spotifyDisplayName}
                        </div>

                        <a className = "bg-red-500 rounded-2xl p-5 gap-6 text-white"
                        href={"/api/auth/spotify/signout"}>
                            Sign Out
                        </a>
                        

                    </div>
                );
    else 
        auth = (
            <a href={"/api/auth/spotify/login"} className="bg-[#1ED760] rounded-2xl p-5 gap-6 text-white">
                Log-In with Spotify
            </a>
        )

    return (
        <div
            className={"flex-1 bg-[#191414] rounded-2xl p-10 border border-white/10 shadow-lg flex flex-col self-center items-center gap-6"}>
            <div  className={"flex flex-col items-center gap-10"}>
                <Image
                    className={"w-auto h-auto"}
                    src={"/Spotify_Full_Logo_RGB_Green.png"}
                    alt={"Spotify Logo"}
                    width={200}
                    height={200}
                    loading="eager"
                />

                {auth}
                


            </div>

        </div>
    );
}