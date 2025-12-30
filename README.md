# My.FM

A personal music companion app that tracks your Spotify listening habits and helps you discover new music.

## Features
- Track listening history
- Follow your favorite artists
- Discover new releases from followed artists
- View analytics on your music taste

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Spotify API
- CloudFlare R2
- Vercel

## AI Use
- Limited use on backend
- Limited use on frontend logic
- Used on frontend UI/UX

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Spotify account
- A Supabase account
- A Cloudflare account (for R2 storage)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/ayanbhatt008/myfm.git
   cd your-repo
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
```bash
     cp .env.example .env.local
```
   - Fill in your actual API keys and credentials in `.env.local`

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Create the following tables in your Supabase SQL Editor:
```sql
   -- Artist Follows
   CREATE TABLE public.artist_follows (
     id uuid NOT NULL DEFAULT gen_random_uuid(),
     user_id uuid NOT NULL,
     artist_id text,
     created_at timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
     CONSTRAINT artist_follows_pkey PRIMARY KEY (id),
     CONSTRAINT spotify_artists_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
   );

   -- Artist Releases
   CREATE TABLE public.artist_releases (
     id uuid NOT NULL DEFAULT gen_random_uuid(),
     artist_id text NOT NULL UNIQUE,
     metadata jsonb,
     updated_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
     CONSTRAINT artist_releases_pkey PRIMARY KEY (id)
   );

   -- Spotify Tokens
   CREATE TABLE public.spotify_tokens (
     id uuid NOT NULL DEFAULT gen_random_uuid(),
     user_id uuid NOT NULL UNIQUE,
     created_at timestamp with time zone NOT NULL DEFAULT now(),
     access_token text,
     refresh_token text NOT NULL DEFAULT ''::text UNIQUE,
     spotify_id text,
     display_name text DEFAULT ''::text,
     expires_at bigint,
     CONSTRAINT spotify_tokens_pkey PRIMARY KEY (id),
     CONSTRAINT spotify_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
   );

   -- Last Played
   CREATE TABLE public.last_played (
     user_id uuid NOT NULL,
     last_played timestamp with time zone NOT NULL,
     CONSTRAINT last_played_pkey PRIMARY KEY (user_id),
     CONSTRAINT last_played_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.spotify_tokens(user_id)
   );
```

5. **Set up Spotify API**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/api/auth/spotify/callback` to Redirect URIs
   - Copy Client ID and Client Secret to `.env.local`

6. **Set up Cloudflare R2**
   - Create an R2 bucket named `recently-played` in your Cloudflare dashboard
   - Generate API tokens with read/write permissions
   - Add your account ID, access key ID, and secret access key to `.env.local`

7. **Run the development server**
```bash
   npm run dev
```

8. **Open your browser**
   - Navigate to [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
<<<<<<< HEAD
=======
    
>>>>>>> 3dfe83bac7d305d09ebddb2687e47026fd4d8ca2
