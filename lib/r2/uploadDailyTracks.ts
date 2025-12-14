import { r2Track } from "../types/r2_types";
import { getR2Object, uploadR2Object } from "./helper";
import { r2Client } from "./r2client";

export async function uploadDailyTracks(user_id: string, tracks :   r2Track[]) {
    if (tracks.length === 0)
        return;

    

    const dateFolder = new Date(tracks[0].played_at).toISOString().split("T")[0];
    const key = `user/${user_id}/${dateFolder}.json`;

    let existing : r2Track[] = [];
    
    const old_data = await getR2Object('recently-played', key);
    if (old_data) {
        try {
            existing = JSON.parse(old_data) as r2Track[]
        }catch (err) {
        existing = [];
        }
    }

    const mergedTracks = [...existing, ...tracks];
    await uploadR2Object('recently-played', key, mergedTracks)
    
}