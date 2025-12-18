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
        authHref = (<a href={"/login"} className={"text-sm"}> Login | Sign Up </a>)
    else if (user)
        authHref = (<a href={"/dashboard"} className={"text-sm"}> Dashboard </a>)



    return (
        <nav className="bg-background border-b border-foreground/20 backdrop-blur-md text-white">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">

                <div className={"font-bold text-lg"}> My.FM</div>


                <div className={"flex gap-6"}>
                    <a href={"/"}> Home </a>
                    <a> About Us</a>
                </div>

                {authHref}



            </div>
        </nav>
    )

}