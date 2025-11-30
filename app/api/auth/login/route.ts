import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_BASE_URL}api/auth/callback`;

const scope = "user-top-read";

export async function GET() {
    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID!,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        show_dialog: "true"
    });

    return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}


