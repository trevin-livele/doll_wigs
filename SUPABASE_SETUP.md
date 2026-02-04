# Supabase Integration Setup Guide

This project is integrated with Supabase for authentication, database, and real-time features.

## Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details and wait for it to be created

### 2. Get Your API Keys

1. Go to your project's **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set Up the Database Schema

1. Go to your Supabase project's **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL to create all tables and seed data

### 5. Enable Email Auth (Optional)

1. Go to **Authentication** → **Providers**
2. Email is enabled by default
3. Configure email templates in **Authentication** → **Email Templates**

## What's Included

### Database Tables

- **profiles** - User profiles (auto-created on signup)
- **products** - Product catalog
- **categories** - Product categories
- **orders** - Customer orders
- **order_items** - Items in each order
- **wishlists** - User wishlists

### Features

- ✅ User authentication (sign up, sign in, sign out)
- ✅ Profile management
- ✅ Product catalog from database
- ✅ Wishlist functionality (requires auth)
- ✅ Order history (requires auth)
- ✅ Row Level Security (RLS) policies

### Files Structure

```
lib/
├── supabase/
│   ├── client.ts      # Browser client
│   ├── server.ts      # Server client
│   ├── middleware.ts  # Session refresh
│   └── types.ts       # TypeScript types
├── hooks/
│   ├── use-auth.ts    # Authentication hook
│   ├── use-products.ts # Products hook
│   ├── use-wishlist.ts # Wishlist hook
│   └── use-orders.ts  # Orders hook
components/
└── auth/
    └── auth-modal.tsx # Sign in/up modal
middleware.ts          # Next.js middleware
supabase/
└── schema.sql         # Database schema
```

## Testing the Integration

After setup, visit `/api/test-supabase` to verify the connection:

```bash
curl http://localhost:3000/api/test-supabase
```

Expected response:
```json
{
  "success": true,
  "message": "Supabase connection successful!",
  "productsCount": 8,
  "authenticated": false
}
```

## Usage Examples

### Authentication

```tsx
import { useAuth } from '@/lib/hooks/use-auth'

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <button onClick={() => signIn(email, password)}>Sign In</button>
  
  return <button onClick={signOut}>Sign Out</button>
}
```

### Fetching Products

```tsx
import { useProducts } from '@/lib/hooks/use-products'

function ProductList() {
  const { products, loading, error } = useProducts('Curly') // or no arg for all
  
  if (loading) return <div>Loading...</div>
  
  return products.map(p => <div key={p.id}>{p.name}</div>)
}
```

### Wishlist

```tsx
import { useWishlist } from '@/lib/hooks/use-wishlist'

function WishlistButton({ productId }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  return (
    <button onClick={() => toggleWishlist(productId)}>
      {isInWishlist(productId) ? '❤️' : '🤍'}
    </button>
  )
}
```

## Troubleshooting

### "Supabase credentials not configured"
- Make sure `.env.local` exists with correct values
- Restart the dev server after adding env vars

### "relation does not exist"
- Run the `supabase/schema.sql` in your SQL Editor

### Auth not working
- Check that Email provider is enabled in Authentication settings
- Verify your site URL in Authentication → URL Configuration
