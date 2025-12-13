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
   
    
    useEffect(() => {
        async function func() {
            

            
            
            
            const res = await fetch("/api/spotify/releases/latest/")
            const data = await res.json();

            
            
            setResponseData(data.data);
        }

        func();
    }, [refreshCounter])

    async function onRefreshButton() {
        const res_refresh = await fetch("/api/spotify/releases/latest/refresh", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({}),
        });
        
        setRefreshCounter(prev => prev + 1);
        
        
    }


    if (!responseData)
        return (<div>
            hii
        </div>);

    return(
        <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {responseData?.map(item => (
                <AlbumCard key={item.id} album={item} />
                ))}
            </div>

            <button className="px-6 py-2 rounded-2xl bg-red-500 text-white" onClick={onRefreshButton}>
                Refresh
            </button>
        </div>
    );
}