"use client"
import { SpotifyAlbum, SpotifyImage } from "@/lib/types/spotify_types";
import Image from "next/image";
import formatNames from "@/lib/utils/format-names";



export default function AlbumDashboardCard( album : SpotifyAlbum) {
    // Example values you might use:
    // const albumName = album.name;
    // const releaseDate = album.release_date;
    // const artistNames = album.artists.map(a => a.name).join(", ");
    // const albumImage = album.images?.[0];
    const albumImage : SpotifyImage = album.images[album.images.length - 1];
    const albumName = album.name;
    const artistNames = formatNames(album.artists.map(artist => artist.name));



    return (
        <div className="flex flex-col bg-gray-800 rounded-2xl m-2 p-3 gap-2 h-48 items-center">

            <div className="w-24 h-24 flex items-center justify-center bg-gray-400 m-1">
                <Image
                    src={albumImage.url}
                    alt="Album Cover"
                    width={100}
                    height={100}
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
