import { r2Track } from "../types/r2_types";
import { dayKey, dayKeyEST } from "../utils/dateKeys";
import { getR2Object, uploadR2Object } from "./helper";
import { r2Client } from "./r2client";

export async function uploadDailyTracks(user_id: string, tracks :   r2Track[]) {
    if (tracks.length === 0)
        return;

    

    const dateFolder = dayKey(new Date(tracks[0].played_at).toISOString());
    const key = `user/${user_id}/${dateFolder}.json`;

    let existing : r2Track[] = [];
    
    const old_data = await getR2Object('recently-played', key);
    if (old_data) {
        try {
            existing = JSON.parse(old_data) as r2Track[]
        }catch {
            existing = [];
        }
    }

    const mergedTracks = [...existing, ...tracks];
    await uploadR2Object('recently-played', key, mergedTracks)
    
}