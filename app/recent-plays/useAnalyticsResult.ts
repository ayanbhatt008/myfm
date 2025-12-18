import { tracksOnDay } from "@/lib/types/r2_types";
import { useEffect, useState } from "react";

export function useAnalyticsResult(data : tracksOnDay[] | null, enabled : boolean) {
    const [analytics, setAnalytics] = useState<any>();

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

        const result = computeAnalytics(data);
        setAnalytics(result);
        

    }, [data, enabled])



    return analytics;
}

function computeAnalytics(data : null | tracksOnDay[]) : null | number {
    if (!data)
        return null;

    return data.reduce((sum, curr) => sum += curr.tracks.length, 0)
}