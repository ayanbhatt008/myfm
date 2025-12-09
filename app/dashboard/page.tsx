"use client"
import {SpotifyArtist} from "@/lib/spotify/types";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [artistsToDisplay, setArtistsToDisplay] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function func() {
            const res = await fetch("/api/spotify/followed-artists");
            const data = await res.json();
            console.log(data);

        }

        func();
    }, [])


    if (loading) {
        return (
            <div> loading...</div>
        )
    }


}