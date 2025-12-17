import { r2Track } from "../types/r2_types";
import formatNames from "../utils/format-names";

export default function TrackNanoCard({ track }: { track: r2Track }) {
    const trackName = track.name;
    const artistArr = track.artists.map(artist => artist.name);
    const artistName = formatNames(artistArr, 2);

    const datePlayed = new Date(track.played_at);
    const datePlayed_String : string = `${datePlayed.toLocaleTimeString()}`

    const duration_seconds = Math.floor(track.duration_ms / 1000);
    const durationString = `${
        Math.floor(duration_seconds / 60).toString().padStart(2, '0')
        }:${
        (duration_seconds % 60).toString().padStart(2, '0')
        }`;

    const albumName = track.album.name;

    return (
        <div className="flex w-[1000px] mx-auto items-center justify-between border-b p-3 rounded-xl text-xs">
        
            <div className="flex-1 font-semibold truncate w-25 text-center">
                {trackName}
            </div>

            <div className="flex-1 text-sm text-gray-600 truncate w-28 ">
                {albumName}
            </div>


            <div className="flex-1 text-sm text-gray-600 truncate w-28 text-center">
                {artistName}
            </div>

            {/* Date played */}
            <div className="text-xs text-gray-500 text-right w-20 ">
                {datePlayed_String}
            </div>

            {/* Duration */}
            <div className="w-16 text-xs text-gray-500 text-right ">
                {durationString}
            </div>
        </div>
    );
}
