import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(req: Request) {

    const {artist_id} = await req.json();

    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    const user_id = user?.id;

    await supabase
        .from("artist_follows")
        .insert([
            {
                user_id: user_id,
                artist_id: artist_id,

            }
        ]);

    return NextResponse.json({artist_id: artist_id});

    
}