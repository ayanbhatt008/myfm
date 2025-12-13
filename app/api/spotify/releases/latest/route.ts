import { metadata } from "@/app/layout";
import { withAPIWrapper } from "@/lib/api/api_handler";
import { createClient } from "@/lib/supabase/server";
import { SpotifyAlbum } from "@/lib/types/spotify_types";

export async function GET(req: Request) {
    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();
        
        const url = new URL(req!.url);
        const ids_string = url.searchParams.get("artist_ids")?.trim();

        let ids: string[];

        if (ids_string) {ids = ids_string.split(',');}
        else {
            let {data} = await supabase
                .from("artist_releases")
                .select("artist_id");
            ids = data?.map(obj => obj.artist_id) || [];


        }

        if (ids.length === 0)
            return null;


        const {data : metadata_array, error} = await supabase 
            .from("artist_releases")
            .select("metadata")
            .in("artist_id", ids);

        if (!metadata)
            return;

        
        const albums_raw : SpotifyAlbum[] = metadata_array!.map(obj => obj.metadata as SpotifyAlbum)
        

        const albums = removeDuplicates(albums_raw);

        
        return albums_raw;  
    }, req, {requireAuth: true})
}


function removeDuplicates(raw : SpotifyAlbum[]) : SpotifyAlbum[] {
    const seen = new Set<string>;

    const filtered = raw.filter(album => {
        if (seen.has(album.id))
            return false;
        seen.add(album.id);
        return true;
    })

    return filtered;
}


