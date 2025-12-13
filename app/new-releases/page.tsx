"use client"

import {useState, useEffect} from "react";

import TrackCard from "@/lib/ components/track-card";
import {SpotifyAlbum, SpotifyTopTrackResponse} from "@/lib/types/spotify_types";
import {APIresponse} from "@/lib/types/api_types";

export default function NewReleases() {
    const [responseData, setResponseData] = useState<null | SpotifyAlbum[]>(null);
    
    useEffect(() => {
        async function func() {
            const res2 = await fetch("/api/spotify/releases/latest/refresh", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({}),
            });
            const data2: APIresponse<any> = await res2.json();


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