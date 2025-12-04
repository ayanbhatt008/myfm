import { supabase } from "../supabase/client";
import {useState, useEffect} from "react";


export function useSpotifyAuth() {
    
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpotify = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            
                console.log(user);
            if (!user)
                return;

            const {data: spotifyData} = await supabase
                .from("spotify_tokens")
                .select("display_name")
                .eq("user_id", user?.id)
                .maybeSingle();
            
            setDisplayName(spotifyData?.display_name ?? null);
            setLoading(false);


        };

        fetchSpotify();
    });


    return {displayName, loading};
}