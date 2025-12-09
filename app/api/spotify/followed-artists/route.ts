
import {createClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase
        .from("artist_follows")
        .select("artist_id")
        .eq("user_id", user!.id);

    if (error)
        return NextResponse.json({error: error.message});

    return NextResponse.json(data);

}