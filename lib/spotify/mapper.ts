
import {
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyArtistQueryResponse,
    SpotifyImage,
    SpotifyTopTrackResponse,
    SpotifyTrack
} from "@/lib/spotify/types";


function mapSpotifyArtist(artist: any): SpotifyArtist {
    return {
        external_url: {
            spotify: artist.external_urls.spotify
        },
        href: artist.href ?? null,
        id: artist.id,
        name: artist.name,
        images: artist.images ?
            artist.images.map((image: any) => mapSpotifyImages(image)) :
            undefined,
    }
}

function mapSpotifyImages(images: any): SpotifyImage{
    
    return {
        height: images.height,
        url: images.url,
        width: images.width
    }

}


function mapSpotifyAlbum(album: any) : SpotifyAlbum {
    return {
        artists: album.artists.map((artist: any) => mapSpotifyArtist(artist)),
        external_urls: {
            spotify: album.external_urls.spotify
        },
        id: album.id,
        images: album.images.map((image: any) => mapSpotifyImages(image)),
        name: album.name,
    }
}


export function mapSpotifyTrack(track: any) : SpotifyTrack {
    return {
        album: mapSpotifyAlbum(track.album),
        artists: track.artists.map((artist: any) => mapSpotifyArtist(artist)),
        duration_ms: track.duration_ms,
        external_url: {
            spotify: track.external_urls.spotify
        },
        href: track.href,
        name: track.name,
        id: track.id,
        uri: track.uri,
    }
}

export function mapSpotifyTopTracksResponse(response: any): SpotifyTopTrackResponse {
    return {
        items: response.items.map((track: any) => mapSpotifyTrack(track)),
        limit: response.limit,
        offset: response.offset,
    }
}

export function mapSpotifyArtistQueryResponse(response: any): SpotifyArtistQueryResponse {
    return {
        limit: response.limit,
        offset: response?.offset,
        items: response.items.map((artist: any) => mapSpotifyArtist(artist)),
    }
}