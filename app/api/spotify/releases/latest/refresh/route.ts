import {withAPIWrapper} from "@/lib/api/api_handler";
import {createClient} from "@/lib/supabase/server";
import {SpotifyAlbum} from "@/lib/types/spotify_types";
import {getAppAccessToken} from "@/lib/spotify/appAccessToken";
import {mapSpotifyArtist} from "@/lib/spotify/mapper";

export async function POST(req: Request) {
    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();
        const app_token = await getAppAccessToken();
        const params = await req?.json();
        const ids_string = params.artist_ids?.trim();

        let ids: string[];

        if (ids_string) {ids = ids_string.split(',');}
        else {
            let {data} = await supabase
                .from("artist_releases")
                .select("artist_id");
            ids = data?.map(obj => obj.artist_id) || [];


        }


    }, req, {requireAuth: true})
}


async function refresh(id : string, token : string) : Promise<SpotifyAlbum | null> {
    const params = new URLSearchParams({
        include_groups: "album,single",
        limit: "1"
    })
    const res = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (!res.ok)
        return null;


    const data = await res.json();

    const album = mapSpotifyArtist(data);




    return album;

}