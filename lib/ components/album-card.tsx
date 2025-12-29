"use client"
import { SpotifyAlbum, SpotifyImage } from "@/lib/types/spotify_types";
import Image from "next/image";
import formatNames from "@/lib/utils/format-names";



export default function AlbumCard( {album} : {album : SpotifyAlbum}) {
    
    const albumImage : SpotifyImage = album.images[album.images.length - 2];
    const albumName = album.name;
    const artistNames = formatNames(album.artists.map(artist => artist.name));
    const external_url = album.external_urls.spotify;
        



    return (
        <div className="flex flex-col bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-4 gap-4 hover:bg-white/10 hover:border-[#76BED0]/40 transition-all duration-300 shadow-lg w-full">

            <div className="flex items-center justify-center bg-[#001021]/50 shadow-xl w-full aspect-square">
                <Image
                    src={albumImage.url}
                    alt="Album Cover"
                    width={albumImage.width}
                    height={albumImage.height}
                />
            </div>


            <div className="flex flex-col justify-center text-white text-center space-y-2">

                <p className="text-base font-bold text-white line-clamp-2 min-h-[3rem]">
                    {albumName}
                </p>


                <p className="text-sm text-white/70 line-clamp-1">
                    {artistNames}
                </p>

                <a 
                    href={external_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#76BED0] hover:text-[#5da8bc] text-sm transition-colors mt-1"
                >
                    View on Spotify →
                </a>


            </div>
        </div>
    );
}