"use client"

import {useState, useEffect} from "react";

import TrackCard from "@/lib/ components/track-card";
import {SpotifyAlbum, SpotifyTopTrackResponse} from "@/lib/types/spotify_types";

export default function TopTracks() {
    const [responseData, setResponseData] = useState<null | SpotifyAlbum[]>(null);
    
    useEffect(() => {
        async function func() {
            

        }

        func();
    }, [])


    if (!responseData)
        return (<div>
            hii
        </div>);

    return(<div className={"flex justify-center items-center flex-wrap gap-4"}>
        {/*responseData?.items.map((item) => (
            <TrackCard key = {item.id} track={item} />
        ))*/}
    </div>)
}