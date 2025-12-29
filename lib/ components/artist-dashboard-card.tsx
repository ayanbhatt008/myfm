"use client"
import {SpotifyAlbum, SpotifyArtist, SpotifyImage, SpotifyTrack} from "@/lib/types/spotify_types";
import formatNames from "@/lib/utils/format-names";
import Image from "next/image";
import { supabase } from "../supabase/client";
import {useState} from "react";


export default function ArtistDashboardCard({artist}: {artist : SpotifyArtist}) {

    

    const artistName : string = artist.name;
    const external_url = artist.external_url.spotify;

    const image: SpotifyImage = artist.images![2];

    




    return (
        <div className="flex flex-col bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-4 gap-4 hover:bg-white/10 hover:border-[#76BED0]/40 transition-all duration-300 shadow-lg items-center">
            <div className="flex items-center justify-center bg-[#001021]/50 shadow-xl">
                <Image
                    src={image.url}
                    alt="Artist Profile Picture"
                    width={image.width}
                    height={image.height}
                />
            </div>


            <div className="flex flex-col justify-center text-white text-center w-full space-y-2">
                <p className="text-xl font-bold text-white truncate">{artistName}</p>
                <a 
                    href={external_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#76BED0] hover:text-[#5da8bc] text-sm transition-colors"
                >
                    View on Spotify →
                </a>
            </div>

            

        </div>
    );






}