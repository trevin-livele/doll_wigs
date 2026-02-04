import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test connection by fetching products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5)

    // Test auth status
    const { data: { user } } = await supabase.auth.getUser()

    if (productsError) {
      return NextResponse.json({
        success: false,
        error: productsError.message,
        hint: 'Make sure you have run the schema.sql in your Supabase SQL Editor'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      productsCount: products?.length || 0,
      authenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    }, { status: 500 })
  }
}
