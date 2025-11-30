import {getIronSession, IronSession, SessionOptions} from "iron-session";
import {cookies} from "next/headers";


export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD!,
    cookieName: "spotapp_session",
    cookieOptions: {
        secure: false,
    }
}


export interface SessionData {
    internalUUID: string,
    spotifyID: string,
}

export async function getSessionData(): Promise<IronSession<SessionData>> {
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}