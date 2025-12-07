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
      <div className="p-6 rounded-lg bg-secondary text-secondary-foreground">
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome, {profileName} — access screened deals, founder profiles, and smart matching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deals — Recommended For You</CardTitle>
            </CardHeader>
            <CardContent>
              {deals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No deals found matching your preferences.</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/proposals">Browse all deals</Link>
                  </Button>
                </div>
              ) : (
                deals.map((d: any) => (
                  <div key={d.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                    <Link href={`/proposals?businessId=${d.id}`} className="font-semibold hover:underline text-lg">
                      {d.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{d.industry} • {d.stage}</p>
                    <p className="text-sm mt-2 line-clamp-2">{d.pitch}</p>
                     <div className="mt-3 flex items-center justify-between">
                        <span className="text-primary font-semibold">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(d.targetRaise ?? 0)} Sought</span>
                        <Button variant="secondary" size="sm" asChild>
                            <Link href={`/proposals?businessId=${d.id}`}>View Details</Link>
                        </Button>
                    </div>
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
                <p className="text-center py-8 text-muted-foreground">You have no saved opportunities.</p>
              ) : (
                saved.map((s: any) => (
                  <div key={s.id} className="p-3 border-b last:border-b-0 flex justify-between items-center">
                    <div>
                        <p className="font-medium">{s.refId}</p>
                        <p className="text-xs text-muted-foreground uppercase">{s.type}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        {/* This would link to the specific saved item, e.g. /businesses/{s.refId} */}
                        <Link href="#">View</Link>
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {threads.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">You have no messages.</p>
              ) : (
                threads.map((t: any) => (
                  <div key={t.id} className="p-3 border-b last:border-b-0 hover:bg-muted/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{t.participants?.filter((p: string) => p !== authUser.uid).join(", ") || 'Conversation'}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                           {t.messages?.[t.messages.length - 1]?.text ?? 'No messages yet'}
                        </div>
                      </div>
                      {/* Add unread indicator logic if available */}
                    </div>
                  </div>
                ))
              )}
              <div className="mt-4 text-center">
                <Button asChild>
                  <Link href="#">Open All Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We recommend startups based on your preferences. Configure your preferences to get better matches.</p>
               <Button variant="outline" className="w-full mt-4">Edit Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
