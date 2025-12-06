"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Edit, Plus, Share2 } from "lucide-react";
import { useUser } from '@/firebase/auth/use-user';
import Link from 'next/link';
import useMyBusiness from "@/lib/useMyBusiness";
import { useToast } from '@/hooks/use-toast';

/* Chart Data */
const viewsData = [
  { name: 'Day 1', views: 4 }, { name: 'Day 2', views: 3 },
  { name: 'Day 3', views: 5 }, { name: 'Day 4', views: 8 },
  { name: 'Day 5', views: 6 }, { name: 'Day 6', views: 10 },
  { name: 'Day 7', views: 12 },
];

const engagementData = [
  { name: 'Jan', score: 30 }, { name: 'Feb', score: 45 },
  { name: 'Mar', score: 60 }, { name: 'Apr', score: 55 },
  { name: 'May', score: 75 }, { name: 'Jun', score: 80 },
];

const tasks = [
  { text: "Complete your business profile to 100%", completed: false },
  { text: "Upload your latest pitch deck", completed: true },
  { text: "Create your first funding proposal", completed: true },
  { text: "Respond to Sophia Patel's message", completed: false },
];

export default function DashboardPage() {
  const { user: authUser, userData, loading: userLoading } = useUser();
  const router = useRouter();
  const { business, loading: dataLoading, error: businessError } = useMyBusiness();
  const { toast } = useToast();
  const [isInviteDialogOpen, setInviteDialogOpen] = useState(false);

  useEffect(() => {
    if (!userLoading && !authUser) {
      router.push('/sign-in');
    }
    if (!userLoading && authUser && userData?.role !== 'business owner') {
      router.push('/');
    }
  }, [authUser, userData, userLoading, router]);

  const handleShareProfile = () => {
    if (!business) return;
    // In a real app, you'd have a public profile page like /business/{business.id}
    const publicProfileUrl = `${window.location.origin}/proposals?businessId=${business.id}`;
    navigator.clipboard.writeText(publicProfileUrl)
      .then(() => {
        toast({ title: "Profile link copied to clipboard!" });
      })
      .catch(err => {
        toast({ variant: "destructive", title: "Could not copy link", description: String(err) });
      });
  };

  const handleInviteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    if (email) {
      // In a real app, you would trigger a backend function to send an email invitation.
      console.log(`Inviting ${email} to the team.`);
      toast({ title: "Invitation Sent!", description: `An invitation has been sent to ${email}.` });
      setInviteDialogOpen(false);
    }
  };


  if (userLoading || dataLoading) {
    return <div className="container mx-auto p-4 md:p-8 text-center">Loading Dashboard...</div>;
  }

  if (businessError) {
    return <div className="container mx-auto p-4 md:p-8 text-center text-red-400">Error loading business: {String(businessError)}</div>;
  }

  if (!business) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <h2 className="text-2xl font-bold mb-4">No Business Profile Found</h2>
        <p className="text-muted-foreground mb-6">It looks like you haven't set up your business profile yet.</p>
        <Button asChild>
          <Link href="/dashboard/create-business">Create Business Profile</Link>
        </Button>
      </div>
    );
  }

  const fundingPercentage = business ? (business.raisedAmount / Math.max(1, business.targetRaise)) * 100 : 0;

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-background">
      <div className="p-6 rounded-lg bg-secondary text-secondary-foreground">
        <h1 className="text-3xl font-bold">Welcome back, {userData?.name}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with {business.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Views (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Score</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
                <CardDescription>Manage your funding proposals here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* If your proposals are stored in Firestore, update this area to read proposals by business id */}
                  {/* For now, show placeholder if no proposals */}
                  <p className="text-muted-foreground">No proposals to display (wire proposals query to Firestore to populate).</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Investor Activity</CardTitle>
                <CardDescription>See who is interested in your business.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Investor activity should be fetched from Firestore (views collection). */}
                  <p className="text-muted-foreground">No recent activity (wire investor activity query to Firestore to populate).</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{business.industry} • {business.stage}</CardDescription>
              </div>
              <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{business.pitch}</p>
              <div className="text-sm">
                <p className="font-semibold">Profile Completeness</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={business.profileComplete} className="w-full" />
                  <span>{business.profileComplete}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-bold text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(business.raisedAmount)}</span>
                <span className="text-sm text-muted-foreground">of {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(business.targetRaise)}</span>
              </div>
              <Progress value={fundingPercentage} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Wire your messages query to Firestore to populate real inbox */}
                <p className="text-muted-foreground">No messages yet (connect messages collection to populate).</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.completed ? 'bg-primary' : 'border-2 border-primary'}`}>
                      {task.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : ''}`}>{task.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-8 p-6 rounded-lg bg-secondary flex items-center justify-center gap-4">
        <Button asChild>
          <Link href="/dashboard/proposals/create"><Plus className="mr-2 h-4 w-4" />Create Proposal</Link>
        </Button>
        <Button variant="outline" onClick={handleShareProfile}>
          <Share2 className="mr-2 h-4 w-4" />Share Profile
        </Button>

        <Dialog open={isInviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Invite Team</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Enter the email address of the person you want to invite to your team.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInviteSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="teammate@example.com"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Send Invitation</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

      </footer>
    </div>
  );
}
