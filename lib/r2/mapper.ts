import { r2Track, r2Item } from "../types/r2_types";

export function mapToR2Track(track : any) : r2Track {
    return {
        played_at: track.played_at,
        name : track.track.name,
        id: track.track.id,
        artists: track.track.artists.map((artist: any) => mapToR2Item(artist)),
        album: mapToR2Item(track.track.album),
        duration_ms: track.track.duration_ms,

    }
}

export function mapToR2Item(item: any) : r2Item {
    return {
        name: item.name,
        id: item.id,
    }
}