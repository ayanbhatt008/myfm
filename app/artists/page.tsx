"use client"

import {useState} from "react";
import {SpotifyArtist, SpotifyArtistQueryResponse} from "@/lib/types/spotify_types";
import {mapSpotifyArtistQueryResponse} from "@/lib/spotify/mapper";
import ArtistQueryCard from "@/lib/ components/artist-query-card";
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
        <div className="min-h-screen bg-white  flex flex-col items-center">




            <form onSubmit={handleSubmit} className="w-full max-w-md flex mt-16">
                <input
                    type="text"
                    placeholder="Search for an artist"
                    className="flex-1 px-4 py-2 rounded-l-xl text-black border "

                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={queryLoading}
                    className="bg-blue-600 px-4 py-2 rounded-r-xl hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </form>

            <div className={"flex-col w-auto p-2 mt-16 "}>

                {results && results.items.map((item, i) => (
                    <ArtistQueryCard key = {item.id} artist={item} followed={followIDs.includes(item.id)} />
                ))


                }

            </div>
        </div>
    );
}
