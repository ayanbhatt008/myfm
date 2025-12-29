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


    

    const ordered_track_counts = [...analytics.track_counts.entries()].sort((a, b) => b[1] - a[1]);
    const top_5_tracks = ordered_track_counts.slice(0, 5);

    const ordered_artist_counts = [...analytics.artist_counts.entries()].sort((a, b) => b[1] - a[1]);
    const top_5_artists = ordered_artist_counts.slice(0, 5);

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

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Top 5 Played Tracks</h2>
                <ol className="list-decimal list-inside">
                    {top_5_tracks.map(([track, count], index) => (
                        <li key={index} className="mb-2">
                            {track} - {count} plays
                        </li>
                    ))}
                </ol> 

            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Top 5 Played Artists</h2>
                <ol className="list-decimal list-inside">
                    {top_5_artists.map(([artist, count], index) => (
                        <li key={index} className="mb-2">
                            {artist} - {count} plays
                        </li>
                    ))}
                </ol>
            </div>


        </div>
    )
}
