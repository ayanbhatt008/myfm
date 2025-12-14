import { withAPIWrapper } from "@/lib/api/api_handler";
import { mapToR2Track } from "@/lib/r2/mapper";
import { getUserAccessToken } from "@/lib/spotify/userAccessToken";
import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";
import { r2Track } from "@/lib/types/r2_types";

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
			.filter("user_id", "in",  user_ids)

		const last_played_map = new Map(last_played?.map(row => [row.user_id, row.last_played]));

		const map = user_ids.map(user_id => ({
				user_id: user_id,
				last_played: last_played_map?.get(user_id) ?? null,
				spotify_token: spotify_token.get(user_id)!
		}));


		const data_promises = await Promise.allSettled(
			map.map(async (value) => ({
				user_id: value.user_id,
				tracks: await checkPlays(value)
			}))
		)
		
		const data = data_promises.filter(d => d.status === 'fulfilled')
			.map(d => d.value)
			
        
        
        return data;	
    
    }, req, {requireAuth: false});
}


async function checkPlays({user_id, last_played, spotify_token} : {user_id : string, last_played: any, spotify_token : string}) : Promise<r2Track[]> {
	const res = await fetch ("https://api.spotify.com/v1/me/player/recently-played?limit=2", {
		headers: {
			"Authorization":`Bearer ${spotify_token}`,
			"Content-Type":"application/json",
		}
	});

	const data = await res.json();
	
	const typed_data = data.items.map((val: any) => mapToR2Track(val))

	console.log(typed_data)
	
	
	return typed_data;
}