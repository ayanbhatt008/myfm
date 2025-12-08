import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const artist_id = searchParams.get("artist_id");
    const user_id = searchParams.get("user_id");
    const supabase = await createClient();

    await supabase
        .from("artist_follows")
        .insert([
            {
                user_id: user_id,
                artist_id: artist_id,

            }
        ]);

    
}