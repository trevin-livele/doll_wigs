'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      visibleToasts={1}
      toastOptions={{
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
        className: 'sonner-toast',
        duration: 2000,
      }}
      richColors
    />
  )
}
