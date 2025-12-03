"use client"

import Image from "next/image";


import {SpotifyTopTrackResponse} from "@/lib/spotify/types";
import {useState, useEffect} from "react";
import { createClient } from "@/lib/supabase/client";
import {getSessionData} from "@/lib/session";

export default  function Dashboard() {











    return (
        <div>
            <div className="bg-blue-900 text-2xl text-white text-center">
                <h1> hi</h1>
            </div>

            <SpotifyAuth/>
        </div>
    )
}



function SpotifyAuth() {
    const supabase = createClient();
    const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false);


    useEffect(() => {
        const func = async() => {
            const {data: {user}, error: err} = await supabase.auth.getUser();

            const {data: displayName} = await supabase
                .from("spotify_tokens")
                .select("display_name")
                .eq("user_id", user?.id)
                .single();

            console.log("useeffect",displayName);

        }
        func();
    }, []);

    return (
        <div
            className={"flex-1 bg-[#191414] rounded-2xl p-10 border border-white/10 shadow-lg flex flex-col self-center items-center gap-6"}>
            <a href={"/api/auth/spotify/login"} className={"flex flex-col items-center gap-10"}>
                <Image
                    className={"w-auto h-auto"}
                    src={"/Spotify_Full_Logo_RGB_Green.png"}
                    alt={"Spotify Logo"}
                    width={200}
                    height={200}
                    loading="eager"
                />

                <div className="bg-[#1ED760] rounded-2xl p-5 gap-6 text-white">
                    Log-In with Spotify
                </div>


            </a>

        </div>
    );
}