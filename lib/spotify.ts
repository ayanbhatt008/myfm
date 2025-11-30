import {getSessionData} from "@/lib/session";
import {supabase} from "@/lib/supabase";


export async function ensureAccessToken() {
    const session = await getSessionData();
    const internalUUID = session.internalUUID;

    const {data: tokenData} = await supabase
        .from("tokens")
        .select("*")
        .eq("user_id", internalUUID)
        .single();

    const epoch = tokenData.expires_at;

    if (epoch > Date.now()) {
        return;
    }
    const refresh_token = tokenData.refresh_token;

    const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
    const body = new URLSearchParams({
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    });

    const res = await fetch("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            Authorization : `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    });


    const data = await res.json();
    console.log(data);

    await supabase
        .from("tokens")
        .update({
            access_token: data.access_token,
            expires_at: Date.now() + data.expires_in * 1000
        })
        .eq("user_id", internalUUID);



}

/*async function refreshToken(refresh_token : string) {
    const session = await getSessionData();
    const internalUUID = session.internalUUID;

    const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
    const body = new URLSearchParams({
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    });


    const res = await fetch("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            Authorization : `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    });


    const data = await res.json();
    console.log(data);

    await supabase
        .from("tokens")
        .update({
            access_token: data.access_token,
            expires_at: Date.now() + data.expires_in * 1000
        })
        .eq("user_id", internalUUID);


}*/


