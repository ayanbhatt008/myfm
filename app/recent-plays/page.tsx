"use client"
import TrackNanoCard from "@/lib/ components/track-nano-card";
import { getAppAccessToken } from "@/lib/spotify/appAccessToken";
import { supabase } from "@/lib/supabase/client";
import { APIresponse } from "@/lib/types/api_types";
import { r2Item, r2Track, tracksOnDay } from "@/lib/types/r2_types";
import { dayKeyLocal } from "@/lib/utils/dateKeys";
import { useEffect, useState } from "react";

export default function RecentPlays() {

    const [responseData, SetResponseData] = useState<tracksOnDay[] | null>();
    const [refreshCounter, setRefreshCounter] = useState<number>(0);


    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                startTime: "2025-12-13T23:57:42.739Z",
                endTime: "2025-12-17T01:21:05.527Z"
            })

            const res = await fetch(`/api/r2/recently-played?${params.toString()}`);
            const data : APIresponse<tracksOnDay[]> = await res.json();
            
            const timezonedTracks = UTCtoLocal(data.data!);
            

            SetResponseData(timezonedTracks);
           
        }

        func();
    }, [refreshCounter])

    async function refreshPlays() {
        const {data: {user}} = await supabase.auth.getUser();
        const res = await fetch("/api/spotify/recently-played/collect", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userID: [user?.id]}),
        });

        setRefreshCounter(prev => prev + 1);
    }   


    if (responseData == null)
        return (
            <div>
                hi
            </div>
        );

    let c = -1;

    return (
        <div>
            <button onClick={refreshPlays}>
                REFRESH
            </button>
            {responseData.map((day) => (
                <div key={day.r2DateKey} className="mb-6">
                    <h2 className="text-xl font-bold text-muted-foreground mb-2 text-center">
                        {day.r2DateKey}
                    </h2>

                    {day.tracks.map((track: r2Track) => (
                        <TrackNanoCard
                            track={track}
                            key={c++}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}


function UTCtoLocal(data : tracksOnDay[]) {
    const days = new Map<string, r2Track[]>();
    const allTracks : r2Track[] = data.reduce((array, currData) => array.concat(currData.tracks), [] as r2Track[])
        .sort((a, b) => (a.played_at < a.played_at ? 1 : -1))
    
    allTracks.forEach((val) => {
        const dayKey = dayKeyLocal(val.played_at);

        if (!days.has(dayKey)) {
            days.set(dayKey, [] as r2Track[]);
        }

        days.get(dayKey)!.push(val);
        
    });


    const allTracks_mappedTo_tracksOnDay : tracksOnDay[] = [...days].map(([key, value]) => ({
        r2DateKey: key,
        tracks: value
    })).sort((a,b) => (a.r2DateKey > b.r2DateKey ? -1 : 1))

    return allTracks_mappedTo_tracksOnDay;
}