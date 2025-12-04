"use client"


import {useEffect, useState} from "react";
import {createClient} from "@/lib/supabase/client";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState<null | "login" | "dashboard">(null);
    const supabase = createClient();



    useEffect(() => {
        async function func() {
            const {data: {user}, error} = await supabase.auth.getUser()


                setIsLoggedIn(user ? "dashboard" : "login");
        }

        func();
    }, [])

    let authHref = null;
    if (!isLoggedIn) {

       authHref = (<a  className={"text-sm"}></a>)
    }
    else if (isLoggedIn == "login")
        authHref = (<a href={"/login"} className={"text-sm"}> Login | Sign Up </a>)
    else if (isLoggedIn == "dashboard")
        authHref = (<a href={"/dashboard"} className={"text-sm"}> Dashboard </a>)



    return (
        <nav className="bg-background border-b border-foreground/20 backdrop-blur-md">
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