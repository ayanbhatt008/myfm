export async function getAppAccessToken(): Promise<string> {
    const params = new URLSearchParams({
        grant_type: "client_credentials",
    });

    const basicAuth = "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: basicAuth,
        },
        body: params.toString(),
    });



    const data = await res.json();




    return data.access_token;


}