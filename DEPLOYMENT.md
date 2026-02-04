# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- Supabase project with schema applied
- GitHub repository connected

## Step 1: Environment Variables

In Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional (for M-Pesa integration):
```
MPESA_API_URL=https://your-spring-boot-api.com
```

## Step 2: Supabase Configuration

1. Go to Supabase Dashboard → Settings → API
2. Copy the Project URL and anon/public key
3. Ensure your database has the schema applied:
   - Run `supabase/schema.sql` first
   - Run `supabase/admin-schema.sql` second

4. Make yourself an admin:
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Step 3: Supabase Auth Settings

1. Go to Authentication → URL Configuration
2. Set Site URL to your Vercel domain: `https://your-app.vercel.app`
3. Add redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local dev)

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard
1. Import your GitHub repository
2. Vercel auto-detects Next.js
3. Add environment variables
4. Click Deploy

### Option B: Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 5: Post-Deployment Checklist

- [ ] Test authentication (sign up, sign in, sign out)
- [ ] Test admin access at `/manage`
- [ ] Verify products load from Supabase
- [ ] Test cart and wishlist functionality
- [ ] Check checkout flow

## Troubleshooting

### "Invalid API key" error
- Verify environment variables are set correctly in Vercel
- Redeploy after adding/changing env vars

### Auth redirect issues
- Ensure Site URL matches your Vercel domain exactly
- Check redirect URLs include your production domain

### Admin access not working
- Verify `admin-schema.sql` was run
- Check your user has `role = 'admin'` in profiles table
- Verify RPC functions exist: `get_user_role`, `is_admin`, `admin_get_all_profiles`

### Images not loading
- Add your image domains to `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'your-storage-domain.com' },
  ],
},
```
