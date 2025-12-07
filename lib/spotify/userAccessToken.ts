
import {createClient} from "@/lib/supabase/server";


export async function getUserAccessToken(): Promise<string> {
    const supabase = await createClient();
    const {data: {user}, error } = await supabase.auth.getUser()
    if (error)
        console.log(error);

    const internalUUID = user?.id;

    const {data: tokenData} = await supabase
        .from("spotify_tokens")
        .select("*")
        .eq("user_id", internalUUID)
        .single();

    const epoch = tokenData.expires_at;

    if (epoch > Date.now()) {
        return tokenData.access_token;
    }
    const refresh_token = tokenData.refresh_token;

    const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
    const body = new URLSearchParams({
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    });

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    });


    const data = await res.json();


    const {data: newTokenData} = await supabase
        .from("spotify_tokens")
        .update({
            access_token: data.access_token,
            expires_at: Date.now() + data.expires_in * 1000
        })
        .eq("user_id", internalUUID)
        .select()
        .single();


    return newTokenData.access_token;


}





