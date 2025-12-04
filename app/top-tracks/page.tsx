"use client"
import {supabase} from "@/lib/supabase/client"
import {useState, useEffect, use} from "react";

export default function TopTracks() {
    const [responseData, setResponseData] = useState<any>(null);
    
    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                limit: "2",
                time_range: "long_term"
            });

            const res = await fetch(`api/spotify/top-tracks?${params.toString()}`);
            const json = await res.json();

            console.log(json);
        }

        func();
    }, [])

    return (<div>
        
    </div>);
}