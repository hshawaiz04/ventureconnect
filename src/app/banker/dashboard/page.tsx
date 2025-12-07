
// src/app/banker/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X as XIcon, FileText, Plus, Landmark } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";
import useDeals from "@/lib/useDeals"; // Re-using deals as loan applications for now
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import useLoanProducts from "@/lib/useLoanProducts";

const applicationsData = [
  { name: "Jan", count: 12 }, { name: "Feb", count: 19 },
  { name: "Mar", count: 25 }, { name: "Apr", count: 32 },
  { name: "May", count: 28 }, { name: "Jun", count: 40 },
];

export default function BankerDashboardPage() {
  const { user: authUser, userData, loading: userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const { deals: loanApplications, loading: applicationsLoading } = useDeals();
  const { loanProducts, loading: productsLoading } = useLoanProducts();

  useEffect(() => {
    if (!userLoading && !authUser) {
      router.push("/sign-in");
    }
    // Redirect if user is not a banker
    if (!userLoading && authUser && userData?.role !== "banker") {
      router.push("/");
    }
  }, [authUser, userData, userLoading, router]);
  
  const handleApplicationAction = (applicationId: string, action: "Approved" | "Rejected") => {
    console.log(`Application ${applicationId} has been ${action}.`);
    toast({
      title: `Application ${action}`,
      description: `The loan application has been marked as ${action}.`,
    });
    // Here you would typically update the application's status in Firestore.
  };

  const isLoading = userLoading || applicationsLoading || productsLoading;

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Loading Banker Dashboard...</div>;
  }
  
  if (!authUser) {
     return (
      <div className="container mx-auto p-8 text-center">
        <p className="mb-4">Please sign in to view the banker dashboard.</p>
        <Button asChild><Link href="/sign-in">Sign In</Link></Button>
      </div>
     )
  }

  const stats = {
    totalApplications: loanApplications.length,
    pendingReview: loanApplications.filter(a => !a.status).length,
    approved: loanApplications.filter(a => a.status === 'Approved').length,
    rejected: loanApplications.filter(a => a.status === 'Rejected').length,
  };


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-background">
      <div className="flex justify-between items-center p-6 rounded-lg bg-secondary text-secondary-foreground">
         <div>
            <h1 className="text-3xl font-bold">Welcome, {userData?.name ?? "Banker"}!</h1>
            <p className="text-muted-foreground mt-1">Here is an overview of business loan applications.</p>
        </div>
        <Button asChild>
            <Link href="/banker/dashboard/post-loan"><Plus className="mr-2 h-4 w-4" /> Post New Loan Product</Link>
        </Button>
      </div>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Applications</CardTitle>
                    <CardDescription>All received applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.totalApplications}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Pending Review</CardTitle>
                    <CardDescription>Applications awaiting your action.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.pendingReview}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Total Approved</CardTitle>
                    <CardDescription>Loans approved this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Total Rejected</CardTitle>
                    <CardDescription>Loans rejected this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
                </CardContent>
            </Card>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>New Loan Applications</CardTitle>
              <CardDescription>Review and process new applications from businesses.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Amount Requested</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanApplications.length > 0 ? loanApplications.map((app: any) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-sm text-muted-foreground">{app.industry}</div>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(app.targetRaise ?? 0)}
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button variant="ghost" size="icon" title="View Details">
                            <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-green-500 hover:text-green-600" title="Approve" onClick={() => handleApplicationAction(app.id, 'Approved')}>
                            <Check className="w-4 h-4" />
                        </Button>
                         <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600" title="Reject" onClick={() => handleApplicationAction(app.id, 'Rejected')}>
                            <XIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center h-24">No new applications.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Application Volume</CardTitle>
                    <CardDescription>Monthly trend of incoming applications.</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Loan Products</CardTitle>
                </CardHeader>
                <CardContent>
                  {loanProducts.length === 0 ? (
                    <p className="text-center text-muted-foreground">You have not posted any loan products yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {loanProducts.map(product => (
                        <li key={product.id} className="flex items-start gap-4">
                          <Landmark className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">{product.title}</p>
                            <p className="text-sm text-muted-foreground">{product.interestRate}</p>
                          </div>
                          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className="ml-auto">{product.status}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    