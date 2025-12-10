import {NextResponse} from "next/server";
import {getAppAccessToken} from "@/lib/spotify/appAccessToken";
import {SpotifyArtistQueryResponse} from "@/lib/types/spotify_types";
import {mapSpotifyArtistQueryResponse} from "@/lib/spotify/mapper";


export async function GET(req: Request) {




    const token: string = await getAppAccessToken();
    const types: string[] = ["artist"]

    const {searchParams} = new URL(req.url);
    const query = searchParams.get('query');
    if (!query)
        return NextResponse.json([]);

    const params = new URLSearchParams({
        q: query,
        type: types.join(","),
        limit: "10",
    });

    const res = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();



    const typed_data : SpotifyArtistQueryResponse = mapSpotifyArtistQueryResponse(data.artists);



    return NextResponse.json(typed_data);
}