import { tracksOnDay } from "@/lib/types/r2_types"
import { possibleTabs } from "./history-tabs"
import { analyticsProperties, useAnalyticsResult } from "./useAnalyticsResult"

interface Props {
    responseData: tracksOnDay[] | null
    currentTab: possibleTabs
}



export default function AnalyticsPage({responseData,  currentTab} : Props){
    const analytics: analyticsProperties | null = useAnalyticsResult(responseData, currentTab === 'analytics');

    if (!analytics) 
        return (<div> not yet</div>);

    return (
        <div>
            {analytics.total_tracks}
        </div>
    )
}
