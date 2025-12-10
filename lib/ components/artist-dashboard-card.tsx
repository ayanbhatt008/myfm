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
        <div className="flex flex-col bg-gray-800 rounded-2xl m-2 p-3 gap-3 h-60 items-center ">
            <div className="w-40 h-40 flex items-center justify-center bg-gray-400 m-2">
                <Image
                    src={image.url}
                    alt="Artist Profile Picture"
                    width={image.width}
                    height={image.height}
                    className="object-contain"
                />
            </div>


            <div className="flex flex-col justify-center text-white h-20 w-50">
                <p className="text-2xl font-semibold">{artistName}</p>


            </div>

            

        </div>
    );






}