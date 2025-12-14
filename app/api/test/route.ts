import { withAPIWrapper } from "@/lib/api/api_handler";
import { mapToR2Track } from "@/lib/r2/mapper";
import { getUserAccessToken } from "@/lib/spotify/userAccessToken";
import { createClient } from "@/lib/supabase/server";
import { r2Track } from "@/lib/types/r2_types";

export async function GET(req : Request) {
    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();
        const spot_token = await getUserAccessToken(user!.id);


        const res = await fetch ("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
            headers: {
                "Authorization":`Bearer ${spot_token}`,
                "Content-Type":"application/json",
            }
        });

        const data = await res.json();
            
        const typed_data : r2Track[] = data.items.map((val: any) => mapToR2Track(val));
        return typed_data

    }, req, {requireAuth: true})
}