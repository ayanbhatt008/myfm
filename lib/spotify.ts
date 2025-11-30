import {getSessionData} from "@/lib/session";
import {supabase} from "@/lib/supabase";


export async function getAccessToken() {
    const session = await getSessionData();
    const internalUUID = session.internalUUID;

    const {data: tokenData, error} = await supabase
        .from("tokens")
        .select("*")
        .eq("user_id", internalUUID)
        .single();

    const epoch = tokenData.expires_at;

    if (epoch< Date.now()) {
        await refreshToken();
    }

}

async function refreshToken() {

}