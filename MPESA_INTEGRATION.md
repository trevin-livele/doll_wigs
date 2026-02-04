# M-Pesa Integration Guide

This guide explains how to integrate your Spring Boot M-Pesa payment service with this Next.js frontend.

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  Spring Boot API │────▶│   Safaricom     │
│   (Frontend)    │◀────│  (Payment Svc)   │◀────│   M-Pesa API    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│    Supabase     │     │   Callback URL   │
│   (Orders DB)   │     │   (Webhook)      │
└─────────────────┘     └──────────────────┘
```

## Step 1: Create Payment API Route

Create `app/api/payments/initiate/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const MPESA_API_URL = process.env.MPESA_API_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, phoneNumber, amount } = body

    // Validate order belongs to user
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Call Spring Boot M-Pesa service
    const response = await fetch(`${MPESA_API_URL}/api/mpesa/stkpush`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: phoneNumber.replace(/^0/, '254'), // Convert 07xx to 254xx
        amount: amount,
        accountReference: orderId,
        transactionDesc: `Payment for order ${orderId.slice(0, 8)}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: result.message || 'Payment failed' }, { status: 400 })
    }

    // Update order with checkout request ID
    await supabase
      .from('orders')
      .update({ 
        mpesa_checkout_id: result.CheckoutRequestID,
        status: 'awaiting_payment'
      })
      .eq('id', orderId)

    return NextResponse.json({
      success: true,
      checkoutRequestId: result.CheckoutRequestID,
      message: 'STK push sent. Check your phone.'
    })

  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 500 })
  }
}
```

## Step 2: Create Callback Webhook

Create `app/api/payments/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role for webhook (no user context)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // M-Pesa callback structure
    const { Body } = body
    const { stkCallback } = Body
    const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback

    // Find order by checkout ID
    const { data: order } = await supabase
      .from('orders')
      .select('id')
      .eq('mpesa_checkout_id', CheckoutRequestID)
      .single()

    if (!order) {
      console.error('Order not found for checkout:', CheckoutRequestID)
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    if (ResultCode === 0) {
      // Payment successful
      const metadata = stkCallback.CallbackMetadata?.Item || []
      const mpesaReceiptNumber = metadata.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value
      const transactionDate = metadata.find((i: any) => i.Name === 'TransactionDate')?.Value
      const phoneNumber = metadata.find((i: any) => i.Name === 'PhoneNumber')?.Value

      await supabase
        .from('orders')
        .update({
          status: 'processing',
          mpesa_receipt: mpesaReceiptNumber,
          mpesa_phone: phoneNumber,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

    } else {
      // Payment failed
      await supabase
        .from('orders')
        .update({
          status: 'payment_failed',
          mpesa_error: ResultDesc,
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })

  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  }
}
```

## Step 3: Update Database Schema

Add M-Pesa fields to orders table:

```sql
-- Add M-Pesa columns to orders
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS mpesa_checkout_id TEXT,
ADD COLUMN IF NOT EXISTS mpesa_receipt TEXT,
ADD COLUMN IF NOT EXISTS mpesa_phone TEXT,
ADD COLUMN IF NOT EXISTS mpesa_error TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;

-- Create index for checkout ID lookups
CREATE INDEX IF NOT EXISTS idx_orders_mpesa_checkout ON public.orders(mpesa_checkout_id);
```

## Step 4: Create Payment Hook

Create `lib/hooks/use-payment.ts`:

```typescript
'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function usePayment() {
  const [loading, setLoading] = useState(false)

  const initiatePayment = async (orderId: string, phoneNumber: string, amount: number) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, phoneNumber, amount })
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Payment failed')
        return { success: false, error: data.error }
      }

      toast.success('Check your phone for M-Pesa prompt')
      return { success: true, checkoutRequestId: data.checkoutRequestId }

    } catch (error) {
      toast.error('Payment service unavailable')
      return { success: false, error: 'Service unavailable' }
    } finally {
      setLoading(false)
    }
  }

  return { initiatePayment, loading }
}
```

## Step 5: Update Checkout Page

In your checkout page, add the payment form:

```tsx
const { initiatePayment, loading: paymentLoading } = usePayment()

const handlePayment = async () => {
  if (!phoneNumber || !orderId) return
  
  const result = await initiatePayment(orderId, phoneNumber, orderTotal)
  
  if (result.success) {
    // Start polling for payment status or redirect to confirmation
    router.push(`/orders/${orderId}?pending=true`)
  }
}
```

## Step 6: Environment Variables

Add to Vercel:

```
MPESA_API_URL=https://your-spring-boot-api.com
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Spring Boot API Requirements

Your Spring Boot service should expose:

### POST /api/mpesa/stkpush
Request:
```json
{
  "phoneNumber": "254712345678",
  "amount": 1000,
  "accountReference": "order-uuid",
  "transactionDesc": "Payment for order abc123",
  "callbackUrl": "https://your-app.vercel.app/api/payments/callback"
}
```

Response:
```json
{
  "MerchantRequestID": "xxx",
  "CheckoutRequestID": "xxx",
  "ResponseCode": "0",
  "ResponseDescription": "Success",
  "CustomerMessage": "Success"
}
```

## Testing

1. Use Safaricom sandbox for testing
2. Test phone numbers: 254708374149 (success), 254708374148 (fail)
3. Monitor callback logs in Vercel Functions tab

## Security Considerations

- Validate callback IP is from Safaricom
- Use HTTPS for all endpoints
- Store service role key securely (never expose to client)
- Validate order ownership before initiating payment
- Implement idempotency for callbacks
