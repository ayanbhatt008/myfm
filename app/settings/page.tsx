"use client"

import Image from "next/image";


import {SpotifyTopTrackResponse} from "@/lib/types/spotify_types";
import {useState, useEffect} from "react";
import { supabase } from "@/lib/supabase/client";
import {getSessionData} from "@/lib/session";
import {useRouter} from "next/navigation"
import { useSpotifyAuth } from "@/app/settings/useSpotifyAuth";

export default  function Settings() {

    const router = useRouter();




    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/")
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-3">Settings</h1>
                    <p className="text-[#76BED0]/80 text-lg">Manage your account and connections</p>
                </div>

                <SpotifyAuth/>
                
                <div className="flex items-center justify-center pt-8">
                    <button className="px-8 py-4 bg-white/5 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                            onClick={handleLogout}>
                        SIGN OUT
                    </button>
                </div>
            </div>
        </div>
    )
}



function SpotifyAuth() {

    const {displayName : spotifyDisplayName, loading} = useSpotifyAuth();
    // if null = not logged in; if a string then they are logged in






    let auth = null;

    if (loading)
        auth = (<div className="bg-[#1ED760] rounded-xl px-8 py-4 text-white font-semibold">Loading...</div>)
    else if (spotifyDisplayName)
        auth = (
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-[#1ED760] rounded-xl px-8 py-4 text-white font-semibold shadow-lg">
                    Logged in as {spotifyDisplayName}
                </div>

                <a className="bg-red-500 hover:bg-red-600 rounded-xl px-8 py-4 text-white font-semibold transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                   href={"/api/auth/spotify/signout"}>
                    Sign Out of Spotify
                </a>


            </div>
        );
    else
        auth = (
            <a href={"/api/auth/spotify/login"} className="bg-[#1ED760] hover:bg-[#1db954] rounded-xl px-8 py-4 text-white font-semibold transition-all shadow-lg hover:shadow-[#1ED760]/50 transform hover:scale-105">
                Log-In with Spotify
            </a>
        )

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-10 shadow-2xl flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-8">
                <div className="bg-[#191414] rounded-2xl p-6 shadow-xl">
                    <Image
                        className="w-auto h-auto"
                        src={"/Spotify_Full_Logo_RGB_Green.png"}
                        alt={"Spotify Logo"}
                        width={200}
                        height={200}
                        loading="eager"
                    />
                </div>

                {auth}



            </div>

        </div>
    );
}