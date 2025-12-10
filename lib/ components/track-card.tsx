"use client"
import {SpotifyAlbum, SpotifyArtist, SpotifyImage, SpotifyTrack} from "@/lib/types/spotify_types";
import formatNames from "@/lib/utils/format-names";
import Image from "next/image";


export default function TrackCard( {track }: {track : SpotifyTrack}) {


    const trackName : string = track.name;
    const external_url = track.external_url.spotify;

    const album : SpotifyAlbum = track.album;
    const albumName : string = album.name;


    const image : SpotifyImage = album.images[2];

    const artists: SpotifyArtist[] = album.artists;
    const artistsName: string[] = artists.map(artist => artist.name);
    const artistNameString : string = formatNames(artistsName)



    return (
        <div className="flex flex-row bg-gray-800 rounded-2xl m-2 p-3 gap-3 w-64 items-center ">

            <Image
                src={image.url}
                alt="Album cover"
                width={64}
                height={64}
                className="object-cover object-center rounded-xl w-16 h-16"
            />


            <div className="flex flex-col justify-center text-white">
                <p className="text-lg font-semibold">{trackName}</p>
                <p className="text-sm opacity-80">{artistNameString}</p>
                <p className="text-xs opacity-60">{albumName}</p>
            </div>

        </div>
    );






}