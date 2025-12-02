"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Edit, MessageSquare, MoreVertical, Plus, Share2, Trash2 } from "lucide-react";

// Mock data - in a real app, this would come from Firestore
import seedData from '@/../sample-data/seed.json';

// Mock user - replace with actual Firebase Auth user
const currentUser = seedData.users.find(u => u.uid === 'owner123');

// Mock a simple hook to simulate fetching data
const useFirestoreData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    business: null,
    proposals: [],
    investorActivity: [],
    messages: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const business = seedData.businesses.find(b => b.ownerUid === currentUser?.uid);
      const proposals = seedData.proposals.filter(p => p.businessId === business?.id);
      const investorActivity = seedData.views.map(view => ({
        ...view,
        investor: seedData.users.find(u => u.uid === view.investorId)
      }));
       const messages = seedData.messages.flatMap(thread => 
        thread.messages.map(msg => ({
          ...msg,
          fromUser: seedData.users.find(u => u.uid === msg.fromUid)
        }))
      );

      setData({
        business,
        proposals,
        investorActivity,
        messages,
      });
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return { ...data, loading };
};


// Chart Data
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
  const { business, proposals, investorActivity, messages, loading } = useFirestoreData();

  if (loading) {
    return <div className="container mx-auto p-4 md:p-8 text-center">Loading Dashboard...</div>;
  }
  
  if (!business) {
    return (
        <div className="container mx-auto p-4 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Business Profile Found</h2>
            <p className="text-muted-foreground mb-6">It looks like you haven't set up your business profile yet.</p>
            <Button>Create Business Profile</Button>
        </div>
    );
  }

  const fundingPercentage = business ? (business.raisedAmount / business.targetRaise) * 100 : 0;
  
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-background">
      {/* Welcome Banner */}
      <div className="p-6 rounded-lg bg-secondary text-secondary-foreground">
        <h1 className="text-3xl font-bold">Welcome back, {currentUser?.name}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with {business.name}.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            {/* Analytics Section */}
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

          {/* Proposals List */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
                <CardDescription>Manage your funding proposals here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map(proposal => (
                    <div key={proposal.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary">
                      <div>
                        <h3 className="font-semibold">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{proposal.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${proposal.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {proposal.status}
                        </span>
                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Investor Activity */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Investor Activity</CardTitle>
                <CardDescription>See who is interested in your business.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investorActivity.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary">
                        <div className="flex items-center gap-4">
                           <Avatar>
                            <AvatarImage src={activity.investor.photoURL} alt={activity.investor.name} />
                            <AvatarFallback>{activity.investor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{activity.investor.name} <span className="text-sm text-muted-foreground font-normal">{activity.actionType === 'view' ? 'viewed your profile' : 'bookmarked your profile'}.</span></p>
                            <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Message</Button>
                            <Button variant="outline" size="sm">Share Deck</Button>
                        </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Business Profile Card */}
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
          
          {/* Funding Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-bold text-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(business.raisedAmount)}</span>
                <span className="text-sm text-muted-foreground">of {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(business.targetRaise)}</span>
              </div>
              <Progress value={fundingPercentage} />
            </CardContent>
          </Card>

            {/* Messages Inbox */}
            <Card>
                <CardHeader>
                    <CardTitle>Inbox</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {messages.map(message => (
                            <div key={message.messageId} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={message.fromUser?.photoURL} alt={message.fromUser?.name} />
                                    <AvatarFallback>{message.fromUser?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-semibold">{message.fromUser?.name}</p>
                                        {!message.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

          {/* Tasks & Recommendations */}
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
      
       {/* Bottom CTAs */}
       <footer className="mt-8 p-6 rounded-lg bg-secondary flex items-center justify-center gap-4">
            <Button><Plus className="mr-2 h-4 w-4" />Create Proposal</Button>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" />Share Profile</Button>
            <Button variant="outline">Invite Team</Button>
       </footer>

    </div>
  );
}
