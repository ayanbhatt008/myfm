import {createClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";


export async function GET() {
    const supabase = await createClient();

    const {data: {user}, error: userGetError} = await supabase.auth.getUser();

    if (userGetError)
        return NextResponse.redirect(`${process.env.NEXT_BASE_URL}/dashboard`);


    const user_id = user?.id;

    const {error: deleteError} = await supabase
        .from("spotify_tokens")
        .delete()
        .eq("user_id", user_id)


    if (deleteError)
        console.log(deleteError);

    return NextResponse.redirect(`${process.env.NEXT_BASE_URL}/settings`);


}