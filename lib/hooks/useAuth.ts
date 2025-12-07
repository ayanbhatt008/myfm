import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect( () => {
        supabase.auth.getUser()
            .then(({data: {user}}) => {
                setUser(user ?? null);
                setLoading(false);
            })

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        }); 

        return () => listener.subscription.unsubscribe();
    }, []);

    return {user, loading};



    
}