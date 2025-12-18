"use client"
import DateRange from "@/lib/ components/date-pickers/date-range";
import DateTimeRange from "@/lib/ components/date-pickers/date-time-select";
import SingleDate from "@/lib/ components/date-pickers/single-date-select";
import TrackNanoCard from "@/lib/ components/track-nano-card";
import { getAppAccessToken } from "@/lib/spotify/appAccessToken";
import { supabase } from "@/lib/supabase/client";
import { APIresponse } from "@/lib/types/api_types";
import { r2Item, r2Track, tracksOnDay } from "@/lib/types/r2_types";
import { dayKeyLocal } from "@/lib/utils/dateKeys";
import { Tabs, TabsList } from "@mantine/core";
import { init } from "next/dist/compiled/webpack/webpack";
import { useEffect, useState } from "react";
import DateSelector from "./date-selector";
import PlaysHistory from "./play-history";
import { useRecentPlays } from "./usePlayHistory";

const MIN_DATE_STRING = "2025-12-14"

export default function RecentPlays() {

    
    


    
    const [init_start, init_end] = initRange();
    
    const [range, setRange] = useState<[string,string]>([init_start, init_end]);
    const {data: responseData, loading, refresh : refreshHistory} = useRecentPlays(range);

    

    async function refreshPlays() {
        const {data: {user}} = await supabase.auth.getUser();
        const res = await fetch("/api/spotify/recently-played/collect", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userID: [user?.id]}),
        });

        refreshHistory();
    }



    if (responseData == null)
        return (
            <div>
                hi
            </div>
        );

    

    return (
        <div>
            <DateSelector
                setRange={setRange}
                minDate={MIN_DATE_STRING}
                maxDate={init_end}
            />

            <div className = {"flex items-center justify-center"}> 
                <button onClick={refreshPlays} className = {"rounded-xl bg-white text-black text-center p-4 m-4"}>
                    REFRESH
                </button>
            </div>

            <Tabs defaultValue={"plays"}> 

                <Tabs.List>
                    <Tabs.Tab value = "plays    "> 
                        History
                    </Tabs.Tab>
                </Tabs.List>



                <Tabs.Panel value = "plays">
                    <PlaysHistory
                        responseData={responseData}
                    />
                </Tabs.Panel>
            </Tabs>
            
        </div>
    );
}




function initRange() : [string, string] {
    const d : Date = new Date();
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    const init_start : string = d.toISOString();
    d.setDate(d.getDate() + 1);
    const init_end : string = d.toISOString();
    return [init_start, init_end]
}