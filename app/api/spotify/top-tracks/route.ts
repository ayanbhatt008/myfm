import {getUserAccessToken,} from "@/lib/spotify/userAccessToken";
import { mapSpotifyTopTracksResponse } from "@/lib/spotify/mapper";
import { SpotifyTopTrackResponse } from "@/lib/types/spotify_types";
import {NextResponse} from "next/server";



export async function GET(req : Request) {
    const access_token : string = await getUserAccessToken();

    const {searchParams} = new URL(req.url);

    const limit = searchParams.get("limit") ?? "2";
    const time_range = searchParams.get("time_range") ?? "long_term";


    const params = new URLSearchParams({
        limit: limit,
        time_range: time_range,
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



    return NextResponse.json(response);
}


