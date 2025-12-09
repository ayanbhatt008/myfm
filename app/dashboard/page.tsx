import {SpotifyArtist} from "@/lib/spotify/types";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [artistsToDisplay, setArtistsToDisplay] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function func() {

        }

        func();
    })


    if (loading) {
        return (
            <div> loading...</div>
        )
    }


}