"use client"

import {useState} from "react";
import {SpotifyArtistQueryResponse} from "@/lib/spotify/types";
import {mapSpotifyArtistQueryResponse} from "@/lib/spotify/mapper";
import ArtistCard from "@/lib/ components/artist-card";

export default function SearchPage() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const [results , setResults] = useState<null | SpotifyArtistQueryResponse>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        if (query == lastQuery) {
            return;
        }
        setLoading(true);
        setLastQuery(query);


        const params = new URLSearchParams({
            query: query
        })

        const res = await fetch(`api/spotify/artist-query/?${params.toString()}`)
        const data : SpotifyArtistQueryResponse  = await res.json();


        setResults(data);
        setLoading(false);


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
                    disabled={loading}
                    className="bg-blue-600 px-4 py-2 rounded-r-xl hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </form>

            <div className={"flex-col w-auto p-2 mt-16 "}>

                {results && results.items.map((item, i) => (
                    <ArtistCard key = {item.id} artist={item}/>
                ))


                }

            </div>
        </div>
    );
}
