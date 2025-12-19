import { r2Item, r2Track, tracksOnDay } from "@/lib/types/r2_types";
import { useEffect, useState } from "react";

export interface analyticsProperties {
    total_tracks: number,
    artist_counts: Map<string, number>,
    track_counts: Map<string, number>,
    plays_per_day: {
        date: string,
        count : number,
    }[],
}

export function useAnalyticsResult(data : tracksOnDay[] | null, enabled : boolean) : analyticsProperties | null {
    const [analytics, setAnalytics] = useState<analyticsProperties | null>(null);

    useEffect(() => {
        setAnalytics(null)
    }, [data])

    useEffect(() => {
        if (!data)
            return;
        if (!enabled)
            return;
        if (analytics !== null)
            return;

        const result : analyticsProperties | null = computeAnalytics(data);
        setAnalytics(result);
        
        

    }, [data, enabled])



    return analytics;
}

function computeAnalytics(data : null | tracksOnDay[]) : null | analyticsProperties {
    if (!data)
        return null;

    let total_tracks = 0;
    const artist_counts = new Map<string, number>();
    const track_counts = new Map<string, number>();
    const plays_per_day : {date: string, count : number}[] = [];

    data.forEach((day : tracksOnDay) => {

        total_tracks += day.tracks.length;
        
        plays_per_day.push({
            date: day.r2DateKey,
            count: day.tracks.length
        });
        
        day.tracks.forEach((track : r2Track) => {
            track_counts.set(track.name, (track_counts.get(track.name) ?? 0) + 1);
            
            track.artists.forEach((artist : r2Item) => {
                artist_counts.set(artist.name, (artist_counts.get(artist.name) ?? 0) + 1);
            })
        });


    });
    

    

    return {
        total_tracks, 
        artist_counts, 
        track_counts, 
        plays_per_day,
    };
}