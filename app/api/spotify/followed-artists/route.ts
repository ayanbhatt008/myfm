
import { getAppAccessToken } from "@/lib/spotify/appAccessToken";
import { SpotifyArtist } from "@/lib/types/spotify_types";
import {mapSpotifyArtist } from "@/lib/spotify/mapper"
import {createClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";
import { withAPIWrapper } from "@/lib/api/api_handler";

export async function GET(req: Request) {

    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();
        

        const {data: id_object, error: id_object_error} = await supabase
            .from("artist_follows")
            .select("artist_id")
            .eq("user_id", user!.id);



        if (id_object_error)
            throw new Error;

        const id_array : string[] = id_object?.map((val) => val.artist_id) || [];
        if (id_array.length === 0)
            return [];

        const id_string : string = id_array.join(",")

        const app_token : string = await getAppAccessToken();

        const res = await fetch(`https://api.spotify.com/v1/artists?ids=${id_string}`,
            {
                headers: {
                    Authorization: `Bearer ${app_token}`,
                },
                cache: "no-store"
            }
        )

        if (!res.ok)
            throw new Error;
        
        const res_data = await res.json();

        const artists : SpotifyArtist[] = res_data.artists.map((raw_artist: any) => mapSpotifyArtist(raw_artist))


        return artists;

    }, req, {requireAuth: true});
    

}