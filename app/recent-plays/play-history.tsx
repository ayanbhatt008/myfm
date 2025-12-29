import TrackNanoCard from "@/lib/ components/track-nano-card";
import { r2Track, tracksOnDay } from "@/lib/types/r2_types";

interface Props {
    responseData: tracksOnDay[] | null
}

export default function PlaysHistory({responseData} : Props) {
    let c : number = -1;

    if (!responseData)
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-white/60 text-lg">Loading history...</div>
            </div>
        );

    return (
        <div className="space-y-8">
            {responseData.map((day: tracksOnDay) => (
                <div key={day.r2DateKey} className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-[#76BED0] mb-4 text-center">
                        {day.r2DateKey}
                    </h2> 
                    
                    <div className="space-y-3">
                        {day.tracks.map((track: r2Track) => (
                            <TrackNanoCard
                                track={track}
                                key={c++}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}   