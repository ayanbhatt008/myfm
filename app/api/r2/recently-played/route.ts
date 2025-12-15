    import { withAPIWrapper } from "@/lib/api/api_handler";
    import { getR2Object } from "@/lib/r2/helper";
    import { updateSession } from "@/lib/supabase/proxy";
    import { r2Track, tracksOnDay } from "@/lib/types/r2_types";
    import { dayKey } from "@/lib/utils/dateKeys";
    export async function GET(req: Request) {
        return withAPIWrapper( async (user, req) => {

            const {searchParams} = new URL(req!.url)
            const startTime = searchParams.get("startTime")!
            const endTime = searchParams.get("endTime") ?? startTime;

            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            
            const days : string[] = getUTCRangeOfDates(startDate, endDate);

            const tracksPerDay_promises = await Promise.allSettled(
                days.map(
                    (date) => getTracksForDay(user!.id, date)
                )
            )

            const tracksPerDay : tracksOnDay[] = tracksPerDay_promises
                .filter((value) => value.status === 'fulfilled')
                .map(value => value.value)
                .map(value => filterTracks(value, startDate, endDate));



            return tracksPerDay;
        }, req, {requireAuth: true});
    }

    function filterTracks(value : tracksOnDay, start : Date, end : Date) : tracksOnDay {
        if (value.tracks.length === 0)
            return value;

        let filteredTracks : r2Track[] = value.tracks
        if (dayKey(start) === value.r2DateKey) {
            filteredTracks = filteredTracks.filter(
                (track : r2Track) => new Date(track.played_at) >= start
            );
            

        }
        if (dayKey(end) === value.r2DateKey) {
            filteredTracks= filteredTracks.filter(
                (track : r2Track) => new Date(track.played_at) <= end
            );

            
        }

        return {
                r2DateKey: value.r2DateKey,
                tracks: filteredTracks,
            };

        
    }

    async function getTracksForDay(userID : string, r2DateKey : string)  : Promise<tracksOnDay> {
        const key = `user/${userID}/${r2DateKey}.json`;

        const unparsed_data = await getR2Object("recently-played", key);
        let parsed_data : r2Track[] = [];
        if (unparsed_data) {

            
            try {
                parsed_data = JSON.parse(unparsed_data) as r2Track[];
            }
            catch(err) {
                console.error(err);
            }
        }

        
        
        return {
            r2DateKey : r2DateKey,
            tracks : parsed_data,
        }

    }

    function getUTCRangeOfDates(start : Date, end: Date) {
        

        const days : string[] = [];
        const current = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
        const endDay = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()))

        while (current <= endDay) {
            days.push(dayKey(current));
            current.setUTCDate(current.getUTCDate() + 1)
        }

        return days
    }

    