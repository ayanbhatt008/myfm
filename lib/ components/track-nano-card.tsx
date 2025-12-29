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
        <div className="flex w-full max-w-5xl mx-auto items-center justify-between bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 p-4 rounded-xl hover:bg-white/10 hover:border-[#76BED0]/40 transition-all duration-300 shadow-lg">
        
            <div className="flex-1 font-semibold text-white truncate min-w-0 text-left pr-4">
                {trackName}
            </div>

            <div className="flex-1 text-sm text-white/70 truncate min-w-0 text-center px-4">
                {albumName}
            </div>


            <div className="flex-1 text-sm text-white/70 truncate min-w-0 text-center px-4">
                {artistName}
            </div>

            <div className="text-sm text-[#76BED0] text-right w-24 flex-shrink-0 pl-4">
                {datePlayed_String}
            </div>

            <div className="w-16 text-sm text-white/60 text-right flex-shrink-0 pl-4">
                {durationString}
            </div>
        </div>
    );
}