"use client"
import { useEffect } from "react";

export default function RecentPlays() {
    useEffect(() => {
        async function func() {
            const params = new URLSearchParams({
                startTime: "2025-12-14T02:23:09.407Z",
                endTime: "2025-12-14T02:23:09.407Z"
            })

            const res = await fetch(`/api/r2/recently-played?${params.toString()}`);
            const data = await res.json();
            console.log(data);
        }

        func();
    })

    return (
        <div>
            hi
        </div>
    )
}