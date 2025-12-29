"use client"

import {useState} from "react";
import {SpotifyArtist, SpotifyArtistQueryResponse} from "@/lib/types/spotify_types";
import {mapSpotifyArtistQueryResponse} from "@/lib/spotify/mapper";
import ArtistQueryCard from "./artist-query-card"
import { supabase } from "@/lib/supabase/client";
import { APIresponse } from "@/lib/types/api_types";

export default function SearchPage() {
    const [queryLoading, setQueryLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const [results , setResults] = useState<null | SpotifyArtistQueryResponse>(null);
    const [followIDs, setFollowIDs] = useState<string[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        if (query == lastQuery) {
            return;
        }
        setQueryLoading(true);
        setLastQuery(query);


        const params = new URLSearchParams({
            query: query
        })

        const res = await fetch(`api/spotify/artist-query/?${params.toString()}`)
        const data_query : APIresponse<SpotifyArtistQueryResponse> = await res.json();
        
        if (data_query.error){
            return;
        }
      
        const data_results : SpotifyArtistQueryResponse = data_query.data!;
        
        

        const res_followed = await fetch(`api/spotify/followed-artists`)
        if (!res_followed.ok)
            return;
        const data_follows : APIresponse<SpotifyArtist[]>= await res_followed.json();

        
        const follows : SpotifyArtist[] = data_follows.data!;
        
        const followIds = follows?.map(obj => obj.id) || []

        setResults(data_results);
        setFollowIDs(followIds);



        
        


        
        



        
        setQueryLoading(false);


    }







    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] flex flex-col items-center px-6 py-12">

            <div className="w-full max-w-4xl mb-12">
                <h1 className="text-4xl font-bold text-white mb-3 text-center">
                    Search Artists
                </h1>
                <p className="text-[#76BED0]/80 text-center text-lg">
                    Find and follow your favorite Spotify artists
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-2xl flex shadow-2xl">
                <input
                    type="text"
                    placeholder="Search for an artist..."
                    className="flex-1 px-6 py-4 rounded-l-xl text-white bg-white/10 backdrop-blur-sm border border-[#76BED0]/30 focus:border-[#76BED0] focus:outline-none focus:ring-2 focus:ring-[#76BED0]/50 placeholder-white/50 transition-all"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={queryLoading}
                    className="bg-[#76BED0] px-8 py-4 rounded-r-xl hover:bg-[#5da8bc] transition-all font-semibold text-[#001021] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#76BED0]/50"
                >
                    {queryLoading ? "Searching..." : "Search"}
                </button>
            </form>

            <div className="w-full max-w-4xl mt-12 space-y-4">
                {results && results.items.length > 0 ? (
                    results.items.map((item, i) => (
                        <ArtistQueryCard key={item.id} artist={item} followed={followIDs.includes(item.id)} />
                    ))
                ) : results && results.items.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-white/60 text-lg">No artists found. Try a different search term.</p>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-white/40 text-lg">Start by searching for an artist above</p>
                    </div>
                )}
            </div>
        </div>
    );
}