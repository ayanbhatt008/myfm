

import {getSessionData} from "@/lib/session";
import {redirect} from "next/navigation";
import {supabase} from "@/lib/supabase";
import {getAccessToken} from "@/lib/spotify";


export default async function Dashboard() {





    const session = await getSessionData();
    if (!session.internalUUID)
        redirect("/")


    await getAccessToken()




    return (
        <div className="bg-blue-900 text-2xl text-white text-center"> {}</div>
    )
}