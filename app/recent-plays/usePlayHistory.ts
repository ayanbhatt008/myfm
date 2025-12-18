import { APIresponse } from "@/lib/types/api_types";
import { r2Track, tracksOnDay } from "@/lib/types/r2_types";
import { dayKeyLocal } from "@/lib/utils/dateKeys";
import { useEffect, useState } from "react";

export function useRecentPlays(range : [string, string]) {
    const [data, setData] = useState<tracksOnDay[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  
    const [refreshCounter, setRefreshCounter] = useState<number>(0);
    
    useEffect(() => {
        let canceled = false;
        setLoading(true);

        async function fetchPlays() {
            const params = new URLSearchParams({
                startTime: range[0],
                endTime: range[1]
            })


            try {
                const res = await fetch(`/api/r2/recently-played?${params.toString()}`);
                const json : APIresponse<tracksOnDay[]> = await res.json();
                
                if (canceled)
                    return;

                if (!json.data) {

                    throw new Error("Api returned a null response");
                }

                const timezonedTracks = UTCtoLocal(json.data);
                setData(timezonedTracks);
                setLoading(false);


            } catch (err) {
                if (canceled)
                    return;

                console.error("Failed to fetch plays ", err);
                setData([]);
                setLoading(false);
            }

            
        }

        fetchPlays();

        return () => {canceled = true}
    }, [range, refreshCounter]);




    function refresh() {
        setRefreshCounter(prev => prev + 1);
    }

    return {data, loading, refresh};
}

function UTCtoLocal(data : tracksOnDay[]) {
    const days = new Map<string, r2Track[]>();
    const allTracks : r2Track[] = data.reduce((array, currData) => array.concat(currData.tracks), [] as r2Track[])
        .sort((a, b) => (a.played_at < b.played_at ? 1 : -1))
    
    allTracks.forEach((val) => {
        const dayKey = dayKeyLocal(val.played_at);

        if (!days.has(dayKey)) {
            days.set(dayKey, [] as r2Track[]);
        }

        days.get(dayKey)!.push(val);
        
    });
    


    const allTracks_mappedTo_tracksOnDay : tracksOnDay[] = [...days].map(([key, value]) => ({
        r2DateKey: key,
        tracks: value//.sort((a, b) => b.played_at.localeCompare(a.played_at)),
    })).sort((a,b) => (a.r2DateKey > b.r2DateKey ? -1 : 1))

    return allTracks_mappedTo_tracksOnDay;
}