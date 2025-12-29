"use client"

import {useState, useEffect, use} from "react";

import TrackCard from "@/lib/ components/track-card";
import {SpotifyAlbum, SpotifyTopTrackResponse} from "@/lib/types/spotify_types";
import {APIresponse} from "@/lib/types/api_types";
import AlbumCard from "@/lib/ components/album-card";
import { useRouter } from "next/navigation";

export default function NewReleases() {
    const [responseData, setResponseData] = useState<null | SpotifyAlbum[]>(null);
    const [refreshCounter, setRefreshCounter] = useState<number>(0);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
   
    
    useEffect(() => {
        async function func() {
            

            
            
            
            const res = await fetch("/api/spotify/releases/latest/")
            const data = await res.json();

            
            
            setResponseData(data.data);
        }

        func();
    }, [refreshCounter])

    async function onRefreshButton() {
        setIsRefreshing(true);
        const res_refresh = await fetch("/api/spotify/releases/latest/refresh", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({}),
        });
        
        setRefreshCounter(prev => prev + 1);
        setIsRefreshing(false);
        
        
    }


    if (!responseData)
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] flex items-center justify-center">
                <div className="text-[#76BED0] text-xl">Loading new releases...</div>
            </div>
        );

    return(
        <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3">New Releases</h1>
                    <p className="text-[#76BED0]/80 text-lg">Latest albums from your followed artists</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                    {responseData?.map(item => (
                        <AlbumCard key={item.id} album={item} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <button 
                        className="px-8 py-3 rounded-xl bg-[#76BED0] text-[#001021] font-semibold hover:bg-[#5da8bc] transition-all shadow-lg hover:shadow-[#76BED0]/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                        onClick={onRefreshButton}
                        disabled={isRefreshing}
                    >
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>
            </div>
        </div>
    );
}