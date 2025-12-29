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
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-white/60 text-lg">Loading analytics...</div>
            </div>
        );


    

    const ordered_track_counts = [...analytics.track_counts.entries()].sort((a, b) => b[1] - a[1]);
    const top_5_tracks = ordered_track_counts.slice(0, 5);

    const ordered_artist_counts = [...analytics.artist_counts.entries()].sort((a, b) => b[1] - a[1]);
    const top_5_artists = ordered_artist_counts.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p className="text-amber-500 font-semibold">🚧 Under Construction 🚧</p>
                <p className="text-white/70 text-sm mt-1">This feature is currently being developed</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-6 shadow-lg">
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

            <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Top 5 Played Tracks</h2>
                <ol className="list-decimal list-inside text-white/80 space-y-2">
                    {top_5_tracks.map(([track, count], index) => (
                        <li key={index} className="text-lg">
                            {track} - <span className="text-[#76BED0]">{count} plays</span>
                        </li>
                    ))}
                </ol> 
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Top 5 Played Artists</h2>
                <ol className="list-decimal list-inside text-white/80 space-y-2">
                    {top_5_artists.map(([artist, count], index) => (
                        <li key={index} className="text-lg">
                            {artist} - <span className="text-[#76BED0]">{count} plays</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}