"use client"
import TrackNanoCard from "@/lib/ components/track-nano-card";
import { APIresponse } from "@/lib/types/api_types";
import { r2Item, r2Track, tracksOnDay } from "@/lib/types/r2_types";
import { dayKeyLocal } from "@/lib/utils/dateKeys";
import { useEffect, useState } from "react";

export default function RecentPlays() {

    const [responseData, SetResponseData] = useState<tracksOnDay[] | null>();
    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                startTime: "2025-12-14T23:57:42.739Z",
                endTime: "2025-12-15T01:21:05.527Z"
            })

            const res = await fetch(`/api/r2/recently-played?${params.toString()}`);
            const data : APIresponse<tracksOnDay[]> = await res.json();
            
            const timezonedTracks = UTCtoLocal(data.data!);
            console.log(timezonedTracks)

            SetResponseData(data.data);
           
        }

        func();
    }, [])
    if (responseData == null)
        return (
            <div>
                hi
            </div>
        );

    return (
        <div>
            {responseData[0].tracks.map(
                (track : r2Track) => <TrackNanoCard track={track} key ={track.played_at}/>
            )}
        </div>
    )
}


function UTCtoLocal(data : tracksOnDay[]) {
    const days = new Map<string, r2Track[]>();
    const allTracks : r2Track[] = data.reduce((array, currData) => array.concat(currData.tracks), [] as r2Track[])
    
    allTracks.forEach((val) => {
        const dayKey = dayKeyLocal(val.played_at);

        if (!days.has(dayKey)) {
            days.set(dayKey, [] as r2Track[]);
        }

        days.get(dayKey)!.push(val);
        
    })
    console.log(days);
    return allTracks
}