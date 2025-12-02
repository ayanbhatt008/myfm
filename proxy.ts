import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    console.log("middleware")
    return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",        
  ],
};
