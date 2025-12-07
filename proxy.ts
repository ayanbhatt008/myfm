import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    return updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",

  ],
};
