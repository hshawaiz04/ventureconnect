// src/app/investor/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/firebase/auth/use-user";
import useDeals from "@/lib/useDeals";
import useSaved from "@/lib/useSaved";
import useThreads from "@/lib/useMessages";
import useInvestorProfile from "@/lib/useInvestor";


export default function InvestorDashboardPage() {
  const { user: authUser, userData, loading: userLoading } = useUser();
  const router = useRouter();

  // Load hooks for data fetching
  const { profile, loading: profileLoading } = useInvestorProfile(authUser?.uid);
  const { deals, loading: dealsLoading } = useDeals(profile?.preferences ?? {});
  const { saved, loading: savedLoading } = useSaved();
  const { threads, loading: threadsLoading } = useThreads();

  // Redirect non-authenticated users to sign in
  useEffect(() => {
    if (!userLoading && !authUser) {
      router.replace("/sign-in");
    }
  }, [authUser, userLoading, router]);

  const isLoading = userLoading || profileLoading || dealsLoading || savedLoading || threadsLoading;

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (!authUser) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold">Please sign in</h2>
        <p className="text-muted-foreground mt-2">You must be signed in to view this page.</p>
        <div className="mt-4">
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  // If the logged-in user's Firestore profile exists but role is not "investor"
  if (userData && userData.role !== "investor") {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold">Not an investor account</h2>
        <p className="text-muted-foreground mt-2">Your account does not appear to be an investor. Please sign in with an investor account.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
          <Link href="/sign-in">
            <Button>Sign in with another account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const profileName = userData?.name ?? authUser.email ?? "Investor";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome, {profileName} — access screened deals, founder profiles, and smart matching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deals — recommended</CardTitle>
            </CardHeader>
            <CardContent>
              {deals.length === 0 ? (
                <div>No deals found matching your preferences.</div>
              ) : (
                deals.map((d: any) => (
                  <div key={d.id} className="p-4 border-b last:border-b-0">
                    <Link href={`/businesses/${d.id}`} className="font-semibold hover:underline">
                      {d.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{d.industry} • {d.stage}</p>
                    <p className="text-sm mt-2 line-clamp-2">{d.pitch}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {saved.length === 0 ? (
                <div>No saved items</div>
              ) : (
                saved.map((s: any) => (
                  <div key={s.id} className="p-3 border-b last:border-b-0">
                    <div className="font-medium">{s.refId}</div>
                    <div className="text-xs text-muted-foreground">{s.type}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {threads.length === 0 ? (
                <div>No messages</div>
              ) : (
                threads.map((t: any) => (
                  <div key={t.id} className="p-2 border-b last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{t.participants?.join(", ")}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                           {t.messages?.[t.messages.length - 1]?.text ?? 'No messages yet'}
                        </div>
                      </div>
                      {/* Add unread indicator logic if available */}
                    </div>
                  </div>
                ))
              )}
              <div className="mt-3">
                <Link href="/investor/messages"><Button>Open Messages</Button></Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We recommend startups based on your preferences. (This is a stub — replace with your matching engine/ML scoring later.)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
