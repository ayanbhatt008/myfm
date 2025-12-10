"use client"
import {SpotifyAlbum, SpotifyArtist, SpotifyImage, SpotifyTrack} from "@/lib/types/spotify_types";
import formatNames from "@/lib/utils/format-names";
import Image from "next/image";
import { supabase } from "../supabase/client";
import {useState} from "react";


export default function ArtistQueryCard({artist, followed}: {artist : SpotifyArtist, followed : boolean}) {

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

        const{data: {user}} = await supabase.auth.getUser();



        const params = new URLSearchParams({

            artist_id: artist.id
        });

        const res = await fetch(`${url}/}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                artist_id: artist.id,
            })
        });

        const data = await res.json();

        setIsFollowed(!isFollowed);


    }





    return (
        <div className="flex flex-row bg-gray-800 rounded-2xl m-2 p-3 gap-3 w-128 items-center ">
            <div className="w-40 h-40 flex items-center justify-center bg-gray-400 ">
                <Image
                    src={image.url}
                    alt="Artist Profile Picture"
                    width={image.width}
                    height={image.height}
                    className="object-contain"
                />
            </div>


            <div className="flex flex-col justify-center text-white h-50 w-50">
                <p className="text-2xl font-semibold">{artistName}</p>


            </div>

            <div className={"flex flex-col justify-center w-30 h-20"} >
                {isFollowed ?
                    <button onClick={toggleFollow}
                        className={"rounded-2xl text-white bg-amber-500 font-bold p-2 transition hover:bg-amber-700 "}>
                        Unfollow
                    </button>
                    :
                    <button onClick={toggleFollow}
                        className={"rounded-2xl text-white bg-amber-500 font-bold p-2 transition hover:bg-amber-700 "}>
                        Follow
                    </button>

                }

            </div>

        </div>
    );






}