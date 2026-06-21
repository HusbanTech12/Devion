"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          borderRadius: "12px",
        },
      }}
    />
  )
}
