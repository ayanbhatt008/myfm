export interface r2Track {
    played_at : string,
    id : string,
    name : string,
    artists: r2Item[],
    album: r2Item,
    duration_ms: number,
}

export interface r2Item {
    name: string,
    id: string,
}

export interface tracksOnDay {
        r2DateKey: string,
        tracks: r2Track[],
    }