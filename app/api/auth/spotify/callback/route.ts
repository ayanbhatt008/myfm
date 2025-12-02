import {NextResponse} from "next/server";
import {getSessionData} from "@/lib/session";
import {supabase, supabaseServer} from "@/lib/supabase";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_BASE_URL}api/auth/spotify/callback`;

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

    const {data: {user}, error} = await supabaseServer.auth.getUser();

    console.log(error);
    console.log(user?.id)

    return;

    if (error)
        NextResponse.redirect(`${process.env.NEXT_BASE_URL}/login`)

    await supabase
        .from("spotify_tokens")
        .upsert({
            user_id: user?.id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: expiresAt
        }, {onConflict: "user_id"})
        .select();


    const session = await getSessionData();

    session.internalUUID = user!.id.toString();
    session.spotifyID = profile.id;


    await session.save();


    return NextResponse.redirect(`${process.env.NEXT_BASE_URL}/dashboard`)
}