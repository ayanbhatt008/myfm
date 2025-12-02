"use client"




import {SpotifyTopTrackResponse} from "@/lib/spotify/types";

export default  function Dashboard() {





    const handleClick = async function () {
        const res = await fetch("/api/spotify/top-tracks")
        if (!res.ok) console.log("no ok")
        const data : SpotifyTopTrackResponse = await res.json()
        console.log("from page", data)

    }

    return (
        <div className="bg-blue-900 text-2xl text-white text-center">
            <button onClick={handleClick}>HI</button>
        </div>
    )
}