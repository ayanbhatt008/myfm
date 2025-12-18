import TrackNanoCard from "@/lib/ components/track-nano-card";
import { r2Track, tracksOnDay } from "@/lib/types/r2_types";

interface Props {
    responseData: tracksOnDay[] | null
}

export default function PlaysHistory({responseData} : Props) {
    let c : number = -1;

    if (!responseData)
        return (<div> loading</div>);

    return (
        <div>
            {responseData.map((day: tracksOnDay) => (
                <div key={day.r2DateKey} className="mb-6">
                    <h2 className="text-xl font-bold text-muted-foreground mb-2 text-center">
                        {day.r2DateKey}
                    </h2> 
                    
                    {day.tracks.map((track: r2Track) => (
                        <TrackNanoCard
                            track={track}
                            key={c++}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}