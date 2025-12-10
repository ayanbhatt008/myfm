import {NextResponse} from "next/server";
import {getAppAccessToken} from "@/lib/spotify/appAccessToken";
import {SpotifyArtistQueryResponse} from "@/lib/types/spotify_types";
import {mapSpotifyArtistQueryResponse} from "@/lib/spotify/mapper";
import { withAPIWrapper } from "@/lib/api/api_handler";
import { APIerror, APIresponse } from "@/lib/types/api_types";


export async function GET(req: Request) {

    return withAPIWrapper( async (user, req) => {
        const token: string = await getAppAccessToken();
        if (!token)
            throw new Error;

        const types: string[] = ["artist"]

        const {searchParams} = new URL(req!.url);
        const query = searchParams.get('query');
        if (!query)
            throw new APIerror("Bad Request", 400);


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

        if (!res.ok)
            throw new APIerror("Spotify Request Failed", res.status);

        const data = await res.json();




        const typed_data : SpotifyArtistQueryResponse = mapSpotifyArtistQueryResponse(data.artists);


        
        return typed_data
    }, req, {requireAuth: false})


   
}