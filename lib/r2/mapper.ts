import { r2Track } from "../types/r2_types";

export function mapToR2Track(track : any) : r2Track {
    return {
        played_at: track.played_at,
        name : track.track.name,
        id: track.track.id
    }
}