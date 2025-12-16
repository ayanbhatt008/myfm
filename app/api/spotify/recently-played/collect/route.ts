import { withAPIWrapper } from "@/lib/api/api_handler";
import { mapToR2Track } from "@/lib/r2/mapper";
import { uploadDailyTracks } from "@/lib/r2/uploadDailyTracks";
import { getUserAccessToken } from "@/lib/spotify/userAccessToken";
import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";
import { APIerror } from "@/lib/types/api_types";
import { r2Track } from "@/lib/types/r2_types";
import { dayKey, dayKeyEST } from "@/lib/utils/dateKeys";
import { group } from "console";

export async function POST(req: Request) {
    return withAPIWrapper(async (user, req) => {
        const supabase = await createClient();

        const {data: user_ids_objs} = await supabase
            .from("spotify_tokens")
            .select("user_id")
        
        if (!user_ids_objs)
            return;
        const user_ids = user_ids_objs.map((user_id_obj) => user_id_obj.user_id);

        const spotify_tokens_promises = await Promise.allSettled(user_ids.map(async (userid) => ({
			spotify_token: await getUserAccessToken(userid),
			user_id: userid,
		})));

		const spotify_token = new Map(spotify_tokens_promises
			.filter(r => r.status === 'fulfilled')
			.map(r => [r.value.user_id, r.value.spotify_token])
		);
	

		

		const {data: last_played} = await supabase
			.from("last_played")
			.select("*")
			.in("user_id", user_ids)
		

		const last_played_map = new Map(last_played?.map(row => [row.user_id, row.last_played]));

		const map = user_ids.map(user_id => ({
				user_id: user_id,
				last_played: last_played_map?.get(user_id) ?? null,
				spotify_token: spotify_token.get(user_id)!
		}));

	
		const data_promises = await Promise.allSettled(
			map.map(
				async (value) => await updatePlays(value)
			)
		)

        data_promises.forEach((value) => {
            if (value.status === 'rejected')
                throw new APIerror(value.reason, 500)
        })
		
		const data = data_promises.filter(d => d.status === 'fulfilled')
			.map(d => d.value)
			.filter(d => d.last_played)




        const {error: upsertError} = await supabase
			.from("last_played")
			.upsert(data);


		
        if (upsertError)
			throw new APIerror(upsertError.message, 500);


		return null;
        
    
    }, req, {requireAuth: false});
}


async function updatePlays({user_id, last_played, spotify_token} : {user_id : string, last_played: any, spotify_token : string}) : Promise<updatePlaysReturn> {
	const res = await fetch ("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
		headers: {
			"Authorization":`Bearer ${spotify_token}`,
			"Content-Type":"application/json",
		}
	});



	

	if (!res.ok)
		throw new Error(`Spotify Api Error`)

	const data = await res.json();
	
	const typed_data : r2Track[] = data.items.map((val: any) => mapToR2Track(val))

	

	

	const last_played_date = last_played ? new Date(last_played) : null;
	
	
	const filtered_plays : r2Track[] = last_played_date
		? typed_data.filter(
			(val) => new Date(val.played_at) > last_played_date
		) : typed_data;

	
	
	const groupedByDay = Object.values(groupTracksByDay(filtered_plays))
	
	

	const uploads = await Promise.allSettled(
		groupedByDay.map(async (val) =>
			await uploadDailyTracks(user_id, val)
		)
	)

	

	
	
	
	return {
		user_id: user_id,
		last_played: filtered_plays.length > 0 ? filtered_plays[0].played_at : last_played,
	};
}

function groupTracksByDay(tracks : r2Track[]) {
	return tracks.reduce((tracksByDay, track) => {
		const day = dayKey(track.played_at);
		if (!tracksByDay[day])
			tracksByDay[day] = [];

		tracksByDay[day].push(track);
		return tracksByDay;
	}, {} as Record<string, r2Track[]>);
}

interface updatePlaysReturn {
	user_id: string,
	last_played: string | null,
}