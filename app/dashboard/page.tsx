"use client"
import ArtistDashboardCard from "@/lib/ components/artist-dashboard-card";
import { APIresponse } from "@/lib/types/api_types";
import {SpotifyArtist} from "@/lib/types/spotify_types";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [artistsToDisplay, setArtistsToDisplay] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function func() {
            
            const res = await fetch("/api/spotify/followed-artists");
            const response :APIresponse< SpotifyArtist[] >= await res.json();
            if (response.status !== 200)
                return;
            const data : SpotifyArtist[] = response.data! || [];
            const sorted_data = data.sort((a, b) => a.name.localeCompare(b.name))
            
            setArtistsToDisplay(sorted_data);
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