"use client"
import DateRange from "@/lib/ components/date-pickers/date-range";
import SingleDate from "@/lib/ components/date-pickers/single-date-select";
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


    
    const [range, setRange] = useState<[string,string]>(["2025-12-13T23:57:42.739Z", "2025-12-20T01:21:05.527Z"]);


    useEffect(() => {
        async function func() {
            console.log(range);

            const params = new URLSearchParams({
                startTime: range[0],
                endTime: range[1]
            })

            const res = await fetch(`/api/r2/recently-played?${params.toString()}`);
            const data : APIresponse<tracksOnDay[]> = await res.json();
            
            const timezonedTracks = UTCtoLocal(data.data!);
            

            SetResponseData(timezonedTracks);
           
        }

        func();
    }, [refreshCounter, range])

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
            <SingleDate
                setRange={setRange}
            />

            <div className = {"flex items-center justify-center"}> 
                <button onClick={refreshPlays} className = {"rounded-xl bg-white text-black text-center p-4 m-4"}>
                    REFRESH
                </button>
            </div>
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