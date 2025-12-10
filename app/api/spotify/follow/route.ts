import { withAPIWrapper } from "@/lib/api/api_handler";
import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    return withAPIWrapper(async (user, req) => {
        const {artist_id} = await req!.json();

        const supabase = await createClient();
        
        const user_id = user!.id;

        const {error } = await supabase
            .from("artist_follows")
            .insert([
                {
                    user_id: user_id,
                    artist_id: artist_id,

                }
            ]);

        if (error)
            throw new Error;

        return {artist_id: artist_id}
    }, req, {requireAuth: true});

    
}