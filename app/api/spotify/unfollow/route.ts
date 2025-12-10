import { withAPIWrapper } from "@/lib/api/api_handler";
import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    withAPIWrapper(async (user, req) => {

    
        const {artist_id} = await req!.json();

        const supabase = await createClient();
        
        const user_id = user!.id;

        await supabase
            .from("artist_follows")
            .delete()
            .eq("artist_id", artist_id)
            .eq("user_id", user_id);


        return {artist_id: artist_id};
    }, req, {requireAuth: true})

}