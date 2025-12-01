export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
}

export interface SpotifyArtist {
    external_url: {
        spotify: string;
    }
    href?: string | null;
    id: string;
    name: string;
    type?: string | null;

}


export interface SpotifyAlbum {
    album_type?: string | null;
    artists: SpotifyArtist[];
    available_markets?: string[] | null;
    external_urls: {
        spotify: string;
    };
    href?: string | null;
    id: string;
    images: SpotifyImage[];
    is_playable?: boolean | null;
    name: string;
    release_date?: string | null;
    release_date_precision?: string | null;
    total_tracks?: number | null;
    type?: string | null;
    uri?: string | null;

}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    duration_ms: number;
    external_url: {
        spotify: string;
    };
    href: string;
    name: string;
    id: string;
    uri: string;
    explicit?: boolean | null;
    popularity?: number | null;
    preview_url?: string | null;
    track_number?: number | null;

}


export interface SpotifyTopTrackResponse {
    items: SpotifyTrack[];
    total?: number | null;
    limit: number;
    offset: number | null;
    href?: string | null;
    next?: string | null;
    previous?: string | null;
}

