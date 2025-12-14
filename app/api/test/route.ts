import { withAPIWrapper } from "@/lib/api/api_handler";
import { getUserAccessToken } from "@/lib/spotify/userAccessToken";
import { createClient } from "@/lib/supabase/server";

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

        return await res.json();
    }, req, {requireAuth: true})
}