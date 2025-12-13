"use client"
import { SpotifyAlbum, SpotifyImage } from "@/lib/types/spotify_types";
import Image from "next/image";
import formatNames from "@/lib/utils/format-names";



export default function AlbumCard( {album} : {album : SpotifyAlbum}) {
    
    const albumImage : SpotifyImage = album.images[album.images.length - 1];
    const albumName = album.name;
    const artistNames = formatNames(album.artists.map(artist => artist.name));
        



    return (
        <div className="flex flex-col bg-gray-800 rounded-2xl m-2 p-3 gap-2 h-64 items-center">

            <div className="w-32 h-32 flex items-center justify-center bg-gray-400 m-1">
                <Image
                    src={albumImage.url}
                    alt="Album Cover"
                    width={128}
                    height={128}
                    className="object-contain"
                />
            </div>


            <div className="flex flex-col justify-center text-white h-20 w-48 text-center">

                <p className="text-lg font-semibold">
                    {albumName}
                </p>


                <p className="text-sm text-gray-300">
                    {artistNames}
                </p>


            </div>
        </div>
    );
}
