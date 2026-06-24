"use client"

import { PageHeader } from "@/src/components/shared/page-header"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription and billing information."
      />

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-sm font-semibold">Current Plan</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border bg-primary/5 p-4">
          <div>
            <p className="text-lg font-bold">Growth Plan</p>
            <p className="text-sm text-muted-foreground">$1,499/month — Billed monthly</p>
          </div>
          <StatusBadge status="active" />
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
      {status}
    </span>
  )
}
