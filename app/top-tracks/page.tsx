"use client"

import {useState, useEffect} from "react";

import TrackCard from "@/lib/ components/track-card";
import {SpotifyTopTrackResponse} from "@/lib/types/spotify_types";

export default function TopTracks() {
    const [responseData, setResponseData] = useState<null | SpotifyTopTrackResponse>(null);
    
    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                limit: "15",
                time_range: "short_term"
            });

            const res = await fetch(`api/spotify/top-tracks?${params.toString()}`);
            const json= await res.json();

            if (json.data)
                setResponseData(json.data);

        }

        func();
    }, [])


    if (!responseData)
        return (<div>
            hii
        </div>);

    return(<div className={"flex justify-center items-center flex-wrap gap-4"}>
        {responseData?.items.map((item) => (
            <TrackCard key = {item.id} track={item} />
        ))}
    </div>)
}