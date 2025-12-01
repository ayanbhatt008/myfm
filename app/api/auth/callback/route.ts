import {NextResponse} from "next/server";
import {getSessionData} from "@/lib/session";
import {supabase} from "@/lib/supabase";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_BASE_URL}api/auth/callback`;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code)
        return NextResponse.json({error: "Authorization code not found"}, {status: 400});

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
    });

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: body,
    });

    const tokens = await tokenResponse.json();

    const expiresAt = Date.now() + tokens.expires_in * 1000;


    const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        }
    });

    const profile = await res.json();

    const {data: userData} = await supabase
        .from("users")
        .select("*")
        .eq("spotify_id", profile.id)
        .single();

    let internalUUID: String = userData?.id;


    if (!userData) {
        const {data: userData} = await supabase
            .from("users")
            .insert({
                spotify_id: profile.id,
                name: profile.display_name
            })
            .select()
            .single();

        internalUUID = userData?.id;


    }


    await supabase
        .from("tokens")
        .upsert({
            user_id: internalUUID,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: expiresAt
        }, {onConflict: "user_id"})
        .select();


    const session = await getSessionData();

    session.internalUUID = internalUUID.toString();
    session.spotifyID = profile.id;


    await session.save();


    return NextResponse.redirect(`${process.env.NEXT_BASE_URL}/dashboard`)
}