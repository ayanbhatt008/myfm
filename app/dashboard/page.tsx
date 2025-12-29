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
            <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] flex items-center justify-center">
                <div className="text-[#76BED0] text-xl">Loading your dashboard...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
                    <p className="text-[#76BED0]/80 text-lg">Your followed artists ({artistsToDisplay.length})</p>
                </div>

                {artistsToDisplay.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artistsToDisplay.map((artist) => 
                            <ArtistDashboardCard key={artist.id} artist={artist} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-white/60 text-lg mb-6">You haven't followed any artists yet</p>
                        <a href="/artists" className="px-8 py-4 bg-[#76BED0] hover:bg-[#5da8bc] text-[#001021] font-semibold rounded-xl shadow-lg hover:shadow-[#76BED0]/50 transition-all transform hover:scale-105 inline-block">
                            Find Artists to Follow
                        </a>
                    </div>
                )}
            </div>
        </div>
    )



}