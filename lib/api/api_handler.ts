import {createClient} from "@/lib/supabase/server";
import {APIerror, APIresponse} from "@/lib/types/api_types";
import {NextResponse} from "next/server";

export async function withAPIWrapper<E>(
    handler: (user: {id: string} | null, req? : Request) => Promise<E>,
    req?: Request,
    options?: {requireAuth?: boolean}
) {
    let user = null;
    if (options?.requireAuth !== false) {
        const supabase = await createClient()
        const {data} = await supabase.auth.getUser();
        user = data.user ? {id: data.user.id} : null;

        if (!user) {
            const apiResponse: APIresponse<null> = {data: null, error: "Unauthorizaed", status: 401};
            return NextResponse.json(apiResponse, {status: 401});
        }

    }

    try {
        const result: E = await handler(user, req);
        const apiResponse: APIresponse<E> = {data: result, error: null, status: 200};
        return NextResponse.json(apiResponse, {status: 200});
    }
    catch(err: any) {
        let status = 500;
        let message = "Server error";

        if (err instanceof APIerror)
        {
            status = err.status;
            message = err.message;
        }

        const apiResponse: APIresponse<null> = {data: null, error: message, status: status};
        return NextResponse.json(apiResponse, {status: status})

    }

}