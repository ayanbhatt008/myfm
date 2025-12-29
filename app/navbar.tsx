"use client"


import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";

export default function NavBar() {
    const {user, loading} = useAuth();

    let authHref = null;
    if (loading) {

       authHref = (<a  className={"text-sm"}></a>)
    }
    else if (!user)
        authHref = (<a href={"/login"} className={"text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"}> Login | Sign Up </a>)
    else if (user)
        authHref = (<a href={"/dashboard"} className={"text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"}> Dashboard </a>)



    return (
        <nav className="bg-[#001021] border-b border-[#76BED0]/30 backdrop-blur-md text-white shadow-lg">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 py-5">

                <a href="/" className="font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity duration-200 bg-gradient-to-r from-[#76BED0] to-white bg-clip-text text-transparent">
                    My.FM
                </a>


                <div className="flex items-center gap-8">
                    <a href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#76BED0] hover:after:w-full after:transition-all after:duration-300"> 
                        Home 
                    </a>
                    <a href="/artists" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#76BED0] hover:after:w-full after:transition-all after:duration-300"> 
                        Artists 
                    </a>
                    <a href="/recent-plays" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#76BED0] hover:after:w-full after:transition-all after:duration-300"> 
                        Recent Plays 
                    </a>
                    <a href="/new-releases" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#76BED0] hover:after:w-full after:transition-all after:duration-300"> 
                        New Releases 
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/settings" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#76BED0] hover:after:w-full after:transition-all after:duration-300"> 
                        Settings 
                    </a>
                    
                    <div className="border-l border-white/20 pl-4">
                        {authHref}
                    </div>
                </div>



            </div>
        </nav>
    )

}