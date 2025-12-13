"use client"
import { useEffect } from "react";

export default function Test() {
    useEffect(() => {
        async function func() {
            const res = await fetch("/api/spotify/recently-played/collect", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({}),
            });

            const data = await res.json();
            console.log(data);
        }
        

        func();
    }, [])

    return (<div> hi </div>);
}