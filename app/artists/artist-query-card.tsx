"use client"
import {SpotifyAlbum, SpotifyArtist, SpotifyImage, SpotifyTrack} from "@/lib/types/spotify_types";
import formatNames from "@/lib/utils/format-names";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import {useState} from "react";

interface Props {
    artist: SpotifyArtist,
    followed: boolean,
    
}

export default function ArtistQueryCard({artist, followed}: Props) {

    const [isFollowed, setIsFollowed] = useState(followed);
    /*const trackName : string = track.name;
    const external_url = track.external_url.spotify;

    const album : SpotifyAlbum = track.album;
    const albumName : string = album.name;


    const image : SpotifyImage = album.images[2];

    const artists: SpotifyArtist[] = album.artists;
    const artistsName: string[] = artists.map(artist => artist.name);
    const artistNameString : string = formatNames(artistsName)*/


    const artistName : string = artist.name;
    const external_url = artist.external_url.spotify;

    const image: SpotifyImage = artist.images![2];

    const toggleFollow = async () => {
        const url = isFollowed ? 'api/spotify/unfollow' : 'api/spotify/follow';

        



        const params = new URLSearchParams({

            artist_id: artist.id
        });

        const res = await fetch(`${url}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                artist_id: artist.id,
            })
        });

        const data = await res.json();
        if (data.status == 200)
            setIsFollowed(!isFollowed);


    }





    return (
        <div className="flex flex-row bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl p-4 gap-6 w-full items-center hover:bg-white/10 hover:border-[#76BED0]/40 transition-all duration-300 shadow-lg">
            <div className="flex-shrink-0 bg-[#001021]/50 shadow-xl">
                {image?.url && <Image
                    src={image.url}
                    alt="Artist Profile Picture"
                    width={image.width}
                    height={image.height}
                />}
            </div>


            <div className="flex flex-col justify-center text-white flex-1 min-w-0">
                <p className="text-2xl font-bold text-white truncate">{artistName}</p>
                <a 
                    href={external_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#76BED0] hover:text-[#5da8bc] text-sm mt-1 transition-colors"
                >
                    View on Spotify →
                </a>
            </div>

            <div className="flex-shrink-0">
                {isFollowed ?
                    <button onClick={toggleFollow}
                        className="px-6 py-3 rounded-xl text-[#001021] bg-[#76BED0] font-semibold transition-all hover:bg-[#5da8bc] shadow-lg hover:shadow-[#76BED0]/50 transform hover:scale-105">
                        Unfollow
                    </button>
                    :
                    <button onClick={toggleFollow}
                        className="px-6 py-3 rounded-xl text-white bg-white/10 border-2 border-[#76BED0] font-semibold transition-all hover:bg-[#76BED0] hover:text-[#001021] shadow-lg hover:shadow-[#76BED0]/50 transform hover:scale-105">
                        Follow
                    </button>

                }

            </div>

        </div>
    );






}