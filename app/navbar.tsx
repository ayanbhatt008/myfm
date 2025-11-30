"use client"


export default function NavBar() {


    return (
        <nav className="bg-background border-b border-foreground/20 backdrop-blur-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">

                <div className={"font-bold text-lg"}> My.FM</div>


                <div className={"flex gap-6"}>
                    <a> Home </a>
                    <a> About Us</a>
                </div>


                <a href={"/api/auth/login"} className={"text-sm"}> Login </a>


            </div>
        </nav>
    )

}