#My.FM


Music Service Stat Tracker


##Tech-Stack

- Next.js
  - For frontend and backend
- React.js
  - For frontend
- Typescript
  - For static typing
- Supabase
  - For user authentication and storange
- Spotify API
  - For user data


##Pages
- Navbar
  - React component found at the top of every page

- "/"
  - app/page.tsx
  - Basic home page with introduction
  - ===========

  - "/login"
    - app/login/page.tsx
    - Login and create account page
    - ===========
  
  - "/dashboard"
    - app/dashboard/page.tsx
    - Account settings page
    - ===========


##API Routes

- "/api/auth"
  - Collection of api routes that deal with authentication
  - 
    - "/api/auth/spotify/"
      - Collection of API routes that deal with spotify authentication
      - 
      - "/login"
        - Redirects to spotify authentication with {client_id, scope, redirect_uri}
      - 
      - "/callback"
        - Redirected from spotify auth with spotify access_token and refresh_token
      - 
      - "/signout"
        - Deletes spotify information from supabase databases
    - 
    - "/api/spotify/"
      - Collection of API routes that use the spotify API to return data


##lib

- "/lib/spotify"
  - 
  - "/lib/spotify/userAccessToken.ts"
    - Method dealing with Spotify API
      - getAccessToken() : return a refreshed (if needed) access token for use
  - 
  - "/lib/spotify/types.ts"
    - Typescript interfaces for converting API data into typed objects
  - 
  - "/lib/spotify/mapper.ts"
    - Methods dealing with Spotify API data and converting to interfaces defined in "types.ts" 

- "/lib/supabase"
  - 
  - "/lib/supabase/client.ts"
    - Method for giving a browser sided Supabase client
  - 
  - "/lib/supabase/server.ts"
    - Method for giving a server sided Supabase client
  - 
  - "/lib/supabase/proxy.ts"
    - Updates Supabase session
    - If a non authenticated user is on a page that requiers auth, they will be redirected
    - Called in "*root*/proxy.ts"

      