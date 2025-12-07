
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, MessageSquare, Video, FileText, Plus, HelpCircle } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";
import useDeals from "@/lib/useDeals"; // Re-using deals as businesses seeking advice
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

const mockSessions = [
  { id: 1, businessName: "EcoCharge Solutions", type: "Video Call", status: "Completed", date: "2 days ago" },
  { id: 2, businessName: "ByteSchool EdTech", type: "Q&A", status: "Pending", date: "Tomorrow" },
];

const mockQueries = [
    {
      "id": "query1",
      "authorUid": "owner123",
      "authorName": "Shawaiz Haider",
      "title": "How to calculate burn rate for a pre-revenue startup?",
      "description": "We are a team of 3 and have just started building our MVP. We have some initial angel funding but no revenue yet. How do we accurately calculate our monthly burn rate and project our runway? What are the key expenses to include?",
      "status": "Open",
      "createdAt": 1717100000000
    },
    {
      "id": "query2",
      "authorUid": "anotherOwner",
      "authorName": "Priya Singh",
      "title": "Best marketing channels for a D2C brand with a small budget?",
      "description": "I'm launching a direct-to-consumer brand for handmade leather goods. My initial marketing budget is very small (under ₹50,000). What are the most effective channels to focus on for initial customer acquisition? SEO, social media, influencers?",
      "status": "Answered",
      "createdAt": 1717200000000
    },
    {
      "id": "query3",
      "authorUid": "owner123",
      "authorName": "Shawaiz Haider",
      "title": "What's a realistic valuation for a seed-stage SaaS company?",
      "description": "My SaaS startup has a working MVP, 10 beta users, and we are targeting the Indian SMB market. What are some common methods to arrive at a realistic pre-money valuation for our seed round? Any benchmarks would be helpful.",
      "status": "Open",
      "createdAt": 1717300000000
    }
  ];

export default function AdvisorDashboardPage() {
  const { user: authUser, userData, loading: userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const { deals: businesses, loading: businessesLoading } = useDeals();
  const [queries, setQueries] = useState<any[]>([]);
  const [queriesLoading, setQueriesLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !authUser) {
      router.push("/sign-in");
    }
    if (!userLoading && authUser && userData?.role !== "advisor") {
      router.push("/");
    }
  }, [authUser, userData, userLoading, router]);

  useEffect(() => {
    setQueries(mockQueries);
    setQueriesLoading(false);
  }, []);

  const handleConnect = (businessName: string) => {
      toast({
          title: "Connection Request Sent",
          description: `A notification has been sent to ${businessName}.`
      });
  }

  const isLoading = userLoading || businessesLoading || queriesLoading;

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading Advisor Dashboard...</div>;
  }
  
  if (!authUser) {
     return (
      <div className="container mx-auto p-8 text-center">
        <p className="mb-4">Please sign in to view the advisor dashboard.</p>
        <Button asChild><Link href="/sign-in">Sign In</Link></Button>
      </div>
     )
  }

  const stats = {
      businessesHelped: 12, // mock data
      pendingSessions: mockSessions.filter(s => s.status === 'Pending').length,
      profileViews: 128, // mock data
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-background">
      <div className="flex justify-between items-center p-6 rounded-lg bg-secondary text-secondary-foreground">
        <div>
            <h1 className="text-3xl font-bold">Welcome, {userData?.name ?? "Advisor"}!</h1>
            <p className="text-muted-foreground mt-1">Guide the next generation of successful startups.</p>
        </div>
        <Button asChild>
            <Link href="/advisor/dashboard/post"><Plus className="mr-2 h-4 w-4" /> Post New Article</Link>
        </Button>
      </div>

       <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Businesses Helped</CardTitle>
                    <CardDescription>Total businesses you've engaged with.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.businessesHelped}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Pending Sessions</CardTitle>
                    <CardDescription>Upcoming calls or Q&As.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.pendingSessions}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Profile Views</CardTitle>
                    <CardDescription>How many times founders viewed your profile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.profileViews}</p>
                </CardContent>
            </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>Businesses Seeking Guidance</CardTitle>
                <CardDescription>These startups could benefit from your expertise.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {businesses.length > 0 ? businesses.slice(0, 5).map((biz: any) => (
                        <TableRow key={biz.id}>
                        <TableCell>
                            <div className="font-medium">{biz.name}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{biz.industry}</Badge>
                        </TableCell>
                         <TableCell>{biz.stage}</TableCell>
                        <TableCell className="text-center space-x-2">
                            <Button variant="ghost" size="icon" title="View Profile">
                                <FileText className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleConnect(biz.name)}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Connect
                            </Button>
                        </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No businesses are currently seeking guidance.</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                <CardTitle>Community Questions</CardTitle>
                <CardDescription>Help entrepreneurs by answering their questions.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Query</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {queries.map((query) => (
                        <TableRow key={query.id}>
                            <TableCell className="font-medium">{query.title}</TableCell>
                            <TableCell>{query.authorName}</TableCell>
                            <TableCell>
                                <Badge variant={query.status === 'Open' ? 'destructive' : 'default'}>{query.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/advisor/dashboard/queries/${query.id}`}>
                                      <HelpCircle className="w-4 h-4 mr-2" />
                                      {query.status === 'Open' ? 'Post Solution' : 'View Solution'}
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Your Advisor Profile</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                     <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={userData?.photoURL ?? undefined} />
                        <AvatarFallback>{userData?.name ? getInitials(userData.name) : 'A'}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{userData?.name}</h3>
                    <p className="text-sm text-muted-foreground">Startup Mentor & Financial Analyst</p>
                     <Button variant="secondary" className="w-full mt-4">Edit Profile</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {mockSessions.map(session => (
                            <li key={session.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{session.businessName}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        {session.type === 'Video Call' ? <Video className="w-4 h-4"/> : <MessageSquare className="w-4 h-4"/>}
                                        {session.date}
                                    </p>
                                </div>
                                <Badge variant={session.status === 'Completed' ? 'default' : 'secondary'}>
                                    {session.status}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
