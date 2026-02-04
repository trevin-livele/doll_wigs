-- Supabase Schema for Doll Wigs E-commerce
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  address jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price integer not null,
  old_price integer,
  rating integer default 5,
  sale boolean default false,
  image text not null,
  category text not null,
  description text,
  stock integer default 100,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cart items table
create table if not exists public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Orders table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' not null,
  total integer not null,
  shipping_address jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items table
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  quantity integer not null,
  price integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishlists table
create table if not exists public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- =====================
-- Row Level Security
-- =====================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Categories: Anyone can view
create policy "Anyone can view categories" on public.categories for select using (true);

-- Products: Anyone can view
create policy "Anyone can view products" on public.products for select using (true);

-- Cart policies
create policy "Users can view own cart" on public.cart_items for select using (auth.uid() = user_id);
create policy "Users can add to own cart" on public.cart_items for insert with check (auth.uid() = user_id);
create policy "Users can update own cart" on public.cart_items for update using (auth.uid() = user_id);
create policy "Users can delete from own cart" on public.cart_items for delete using (auth.uid() = user_id);

-- Orders policies
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create own orders" on public.orders for insert with check (auth.uid() = user_id);

-- Order items policies
create policy "Users can view own order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can create order items" on public.order_items for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

-- Wishlists policies
create policy "Users can view own wishlist" on public.wishlists for select using (auth.uid() = user_id);
create policy "Users can add to own wishlist" on public.wishlists for insert with check (auth.uid() = user_id);
create policy "Users can remove from own wishlist" on public.wishlists for delete using (auth.uid() = user_id);

-- =====================
-- Triggers & Functions
-- =====================

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, address)
  values (new.id, new.email, '[]'::jsonb);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================
-- Seed Data
-- =====================

-- Categories
insert into public.categories (name, slug, image) values
  ('Straight Wigs', 'Straight', 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&h=200&fit=crop'),
  ('Curly Wigs', 'Curly', 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=200&h=200&fit=crop'),
  ('Bob Wigs', 'Bob', 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=200&h=200&fit=crop'),
  ('Lace Front', 'Lace Front', 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop'),
  ('HD Lace', 'HD Lace', 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop'),
  ('Colored', 'Colored', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop')
on conflict (slug) do nothing;

-- Products
insert into public.products (name, price, old_price, rating, sale, image, category, description) values
  ('Silky Straight Wig', 18500, 24000, 5, true, 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=400&h=500&fit=crop', 'Straight', 'Premium silky straight human hair wig with natural hairline'),
  ('Body Wave Lace Front', 24900, 32000, 5, true, 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=500&fit=crop', 'Lace Front', 'Beautiful body wave lace front wig for a natural look'),
  ('Curly Bob Wig', 15900, 21000, 5, true, 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=400&h=500&fit=crop', 'Bob', 'Stylish curly bob wig perfect for any occasion'),
  ('HD Lace Closure Wig', 27900, 35000, 5, true, 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=500&fit=crop', 'HD Lace', 'Undetectable HD lace closure wig with pre-plucked hairline'),
  ('Deep Wave Wig', 22900, 28500, 5, true, 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=500&fit=crop', 'Curly', 'Gorgeous deep wave wig with natural texture'),
  ('Blonde Straight Wig', 29900, 38000, 5, true, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop', 'Colored', 'Stunning blonde straight wig for a bold look'),
  ('Kinky Curly Wig', 19500, 25900, 5, true, 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=400&h=500&fit=crop', 'Curly', 'Natural kinky curly wig with soft texture'),
  ('Ombre Body Wave', 28900, 36000, 5, true, 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=500&fit=crop', 'Colored', 'Beautiful ombre body wave wig with gradient color'),
  ('Water Wave Wig', 21500, 27000, 5, true, 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=500&fit=crop', 'Curly', 'Elegant water wave texture for a glamorous look'),
  ('Pixie Cut Wig', 12900, 16500, 5, true, 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop', 'Bob', 'Short and chic pixie cut wig'),
  ('Red Lace Front', 32000, 40000, 5, true, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop', 'Colored', 'Bold red lace front wig for a statement look'),
  ('Natural Straight', 16500, 22000, 5, true, 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=500&fit=crop', 'Straight', 'Classic natural straight wig')
on conflict do nothing;
