import { r2Track } from "../types/r2_types";
import { r2Client } from "./r2client";

export async function uploadDailyTracks(user_id: string, tracks :   r2Track[]) {
    if (tracks.length === 0)
        return;

    

    const dateFolder = new Date(tracks[0].played_at).toISOString().split("T")[0];
    const key = `user/${user_id}/${dateFolder}.json`;

    let existing : r2Track[] = [];
    try {
        const old_data = await r2Client.get(key);
        if (old_data) {
            const text = await old_data.text();
            existing = JSON.parse(text) as r2Track[];
        }
    }
}