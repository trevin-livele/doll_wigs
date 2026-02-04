-- Admin Schema Extension for Doll Wigs E-commerce
-- Run this AFTER the main schema.sql
-- Safe to run multiple times (idempotent)

-- Add role column to profiles
alter table public.profiles add column if not exists role text default 'customer';

-- Create index for role lookups
create index if not exists idx_profiles_role on public.profiles(role);

-- Drop existing admin policies first to avoid conflicts
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;
drop policy if exists "Admins can insert categories" on public.categories;
drop policy if exists "Admins can update categories" on public.categories;
drop policy if exists "Admins can delete categories" on public.categories;
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update orders" on public.orders;
drop policy if exists "Admins can view all order items" on public.order_items;

-- Drop and recreate functions
drop function if exists public.is_admin();
drop function if exists public.get_user_role();
drop function if exists public.admin_get_all_profiles();

-- Helper function to check admin status (security definer bypasses RLS)
create function public.is_admin()
returns boolean
language plpgsql
security definer
stable
as $$
begin
  return exists (
    select 1 from public.profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$;

-- Helper function to get user role
create function public.get_user_role()
returns text
language plpgsql
security definer
stable
as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = auth.uid();
  return coalesce(user_role, 'customer');
end;
$$;

-- Function for admin to fetch all profiles (bypasses RLS)
create function public.admin_get_all_profiles()
returns setof public.profiles
language plpgsql
security definer
stable
as $$
begin
  if public.is_admin() then
    return query select * from public.profiles order by created_at desc;
  else
    return query select * from public.profiles where id = auth.uid();
  end if;
end;
$$;

-- Admin policies for products (CRUD)
create policy "Admins can insert products" on public.products 
  for insert with check (public.is_admin());

create policy "Admins can update products" on public.products 
  for update using (public.is_admin());

create policy "Admins can delete products" on public.products 
  for delete using (public.is_admin());

-- Admin policies for categories (CRUD)
create policy "Admins can insert categories" on public.categories 
  for insert with check (public.is_admin());

create policy "Admins can update categories" on public.categories 
  for update using (public.is_admin());

create policy "Admins can delete categories" on public.categories 
  for delete using (public.is_admin());

-- Admin policies for orders (view all, update status)
create policy "Admins can view all orders" on public.orders 
  for select using (public.is_admin());

create policy "Admins can update orders" on public.orders 
  for update using (public.is_admin());

-- Admin policies for order items (view all)
create policy "Admins can view all order items" on public.order_items 
  for select using (public.is_admin());

-- To make a user an admin, run:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
