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
import HistoryTabs from "./history-tabs";

const MIN_DATE_STRING = "2025-12-14"

export default function RecentPlays() {  
    const [init_start, init_end] = initRange();
    const [range, setRange] = useState<[string,string]>([init_start, init_end]);
    const {data: responseData, loading, refresh : refreshHistory} = useRecentPlays(range);
    const [isRefreshing, setIsRefreshing] = useState(false);
    


    

    async function refreshPlays() {
        setIsRefreshing(true);
        const {data: {user}} = await supabase.auth.getUser();
        const res = await fetch("/api/spotify/recently-played/collect", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userID: [user?.id]}),
        });

        refreshHistory();
        setIsRefreshing(false);
    }



    if (responseData == null)
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] flex items-center justify-center">
                <div className="text-[#76BED0] text-xl">Loading your recent plays...</div>
            </div>
        );

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3">Recent Plays</h1>
                    <p className="text-[#76BED0]/80 text-lg">Your listening history</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-6 mb-8 shadow-lg">
                    <DateSelector
                        setRange={setRange}
                        minDate={MIN_DATE_STRING}
                        maxDate={init_end}
                    />
                </div>

                <div className="flex items-center justify-center mb-8"> 
                    <button 
                        onClick={refreshPlays} 
                        disabled={isRefreshing}
                        className="px-8 py-3 rounded-xl bg-[#76BED0] text-[#001021] font-semibold hover:bg-[#5da8bc] transition-all shadow-lg hover:shadow-[#76BED0]/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                <HistoryTabs
                    data={responseData}
                />
            </div>
            
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