import {getAccessToken,} from "@/lib/spotify/api";
import { mapSpotifyTopTracksResponse } from "@/lib/spotify/mapper";
import { SpotifyTopTrackResponse } from "@/lib/spotify/types";
import {NextResponse} from "next/server";



export async function GET() {
    const access_token : string = await getAccessToken();

    const params = new URLSearchParams({
        limit: "2",
        time_range: "long_term"
    });

    const res = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );


    const data = await res.json();

    const response :SpotifyTopTrackResponse = mapSpotifyTopTracksResponse(data);
    console.log("from route", response)


    return NextResponse.json(response);
}


