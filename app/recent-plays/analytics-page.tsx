import { tracksOnDay } from "@/lib/types/r2_types"
import { possibleTabs } from "./history-tabs"
import { analyticsProperties, useAnalyticsResult } from "./useAnalyticsResult"
import { useEffect } from "react"
import { AreaChart } from "@mantine/charts"

interface Props {
    responseData: tracksOnDay[] | null
    currentTab: possibleTabs
}



export default function AnalyticsPage({responseData,  currentTab} : Props){
    const analytics: analyticsProperties | null = useAnalyticsResult(responseData, currentTab === 'analytics');

    

    if (!analytics) 
        return (<div> not yet</div>);


    

    const ordered_track_counts = [...analytics.track_counts.entries()].sort((a, b) => b[1] - a[1])


    return (
        <div className="m-10">
            <AreaChart
                h={300}
                data={analytics.plays_per_day}
                dataKey="date"
                series={[
                    {name: 'count', color: 'blue.6'}
                ]}
                curveType="natural"
                
            />
        </div>
    )
}
