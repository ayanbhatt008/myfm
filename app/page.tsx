"use client";

import React from "react";
import { useAuth } from "@/lib/hooks/useAuth";


export default function Home() {

    const {user, loading} = useAuth();

    const getStartedHref = loading ? "#" : (!user ? "/login" : "/dashboard");


    return (
        <div
            className="flex min-h-screen items-start justify-center bg-gradient-to-br from-[#001021] via-[#001a35] to-[#002040] font-sans text-white text-center">
            <div className="flex-1 items-start mt-32 px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="font-bold text-6xl md:text-7xl bg-gradient-to-r from-[#76BED0] via-white to-[#76BED0] bg-clip-text text-transparent animate-pulse">
                        My.FM
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                        Your personal music companion
                    </p>

                    <div className="mt-12 p-8 bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-2xl shadow-2xl">
                        <p className="text-lg text-white/70">
                            Track your listening habits, discover new music, and explore your musical journey
                        </p>
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
                        <a href={getStartedHref} className="px-8 py-4 bg-[#76BED0] hover:bg-[#5da8bc] text-[#001021] font-semibold rounded-xl shadow-lg hover:shadow-[#76BED0]/50 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </a>
                        <a href="/recent-plays" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-[#76BED0]/30 hover:border-[#76BED0]/60 transition-all duration-300 transform hover:scale-105">
                            Recent Plays
                        </a>
                        <a 
                            href="https://github.com/ayanbhatt008/myfm" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-[#76BED0]/30 hover:border-[#76BED0]/60 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}