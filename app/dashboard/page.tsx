import {getSessionData} from "@/lib/session";
import {redirect} from "next/navigation";


export default async function Dashboard() {


    const session = await getSessionData();
    if (!session.internalUUID)
        redirect("/")


    return (
        <div className="bg-blue-900 text-2xl text-white text-center"> {}</div>
    )
}