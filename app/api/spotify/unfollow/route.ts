import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const artist_id = searchParams.get("artist_id");
    const user_id = searchParams.get("user_id");
    const supabase = await createClient();

    await supabase
        .from("artist_follows")
        .delete()
        .eq("artist_id", artist_id)
        .eq("user_id", user_id);


    return NextResponse.json({artist_id: artist_id});


}