// src/app/investor/dashboard/page.tsx
"use client";
import React from "react";
import useInvestorProfile from "@/lib/useInvestor";
import useDeals from "@/lib/useDeals";
import useSaved from "@/lib/useSaved";
import useThreads from "@/lib/useMessages";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvestorDashboard() {
  const { profile } = useInvestorProfile();
  const { deals, loading: dealsLoading } = useDeals(profile?.preferences ?? {});
  const { saved } = useSaved();
  const { threads } = useThreads();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Investor Dashboard</h1>
      <p className="text-muted-foreground">Welcome, {profile?.name ?? "Investor"} — access screened deals, founder profiles, and smart matching.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle>Deals — recommended</CardTitle></CardHeader>
            <CardContent>
              {dealsLoading ? <div>Loading...</div> : deals.length === 0 ? <div>No deals</div> :
                deals.map(d => (
                  <div key={d.id} className="p-4 border-b last:border-b-0">
                    <Link href={`/businesses/${d.id}`} className="font-semibold">{d.name}</Link>
                    <p className="text-sm text-muted-foreground">{d.industry} • {d.stage}</p>
                    <p className="text-sm mt-2 line-clamp-2">{d.pitch}</p>
                  </div>
                ))
              }
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Saved Opportunities</CardTitle></CardHeader>
            <CardContent>
              {saved.length === 0 ? <div>No saved items</div> :
                saved.map(s => <div key={s.id}>{s.type} — {s.refId}</div>)
              }
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Messages</CardTitle></CardHeader>
            <CardContent>
              {threads.map(t => <div key={t.id} className="p-2 border-b">{t.participants.join(", ")}</div>)}
              <div className="mt-3">
                <Link href="/investor/messages"><Button>Open Messages</Button></Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Smart Matching</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We recommend startups based on your preferences. (Stub — replace with ML scoring later.)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
