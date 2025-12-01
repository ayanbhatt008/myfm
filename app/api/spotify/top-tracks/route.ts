import {getAccessToken} from "@/lib/spotify";
import {NextResponse} from "next/server";


export async function GET() {
    const access_token : string = await getAccessToken();

    const params = new URLSearchParams({
        limit: "1",
        time_range: "long_term"
    });

    const res = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );


    const data = await res.json();


    console.log("from route.ts", data)

    return NextResponse.json(data);
}