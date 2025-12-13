import { withAPIWrapper } from "@/lib/api/api_handler";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();

        const {data: user_ids} = await supabase
            .from("spotify_tokens")
            .select("user_id")
        
            return user_ids;
    }, req, {requireAuth: false});
}