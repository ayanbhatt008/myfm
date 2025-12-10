"use client"
import ArtistDashboardCard from "@/lib/ components/artist-dashboard-card";
import {SpotifyArtist} from "@/lib/types/spotify_types";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [artistsToDisplay, setArtistsToDisplay] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function func() {
            
            const res = await fetch("/api/spotify/followed-artists");
            const data : SpotifyArtist[] = await res.json();
            const sorted_data = data.sort((a, b) => a.name.localeCompare(b.name))
            
            setArtistsToDisplay(data);
            setLoading(false);
            

        }

        func();
    }, [])


    if (loading) {
        return (
            <div> loading...</div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-80 flex flex-grid items-center justify-center">
                {artistsToDisplay.map((artist) => 
                    <ArtistDashboardCard key={artist.id} artist = {artist} />
                )}
            </div>
        </div>
    )



}