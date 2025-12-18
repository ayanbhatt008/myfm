import { tracksOnDay } from "@/lib/types/r2_types";
import { useEffect, useState } from "react";

export interface analyticsProperties {
    total_tracks: number
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

    const total_tracks = data.reduce((sum, curr) => sum += curr.tracks.length, 0);

    

    return {total_tracks}
}