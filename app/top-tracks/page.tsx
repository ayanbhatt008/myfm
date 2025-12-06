"use client"
import {supabase} from "@/lib/supabase/client"
import {useState, useEffect, use} from "react";

import TrackCard from "@/lib/ components/track-card";
import {SpotifyTopTrackResponse} from "@/lib/spotify/types";

export default function TopTracks() {
    const [responseData, setResponseData] = useState<null | SpotifyTopTrackResponse>(null);
    
    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                limit: "15",
                time_range: "short_term"
            });

            const res = await fetch(`api/spotify/top-tracks?${params.toString()}`);
            const json : SpotifyTopTrackResponse = await res.json();

            setResponseData(json);

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